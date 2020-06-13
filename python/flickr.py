import json
import requests
import os
import sys

from modules import helper

class Flickr:

    def __init__(self):
        self.provider_name = 'flickr'


    def request(self, config, query):
        """
        Make a HTTP request on provider and normalize the data

        Returns:
            [dict]: dictonary of images from this provider
        """
        url = self.build_url(config, query)
        response = requests.get(url)
        normalized_data = self.normalize(response)

        return normalized_data


    def build_url(self, config, query):
        """
        Build the search url for the current provider using the config

        Raises:
            ValueError: should raise a error with api key

        Returns:
            [string]: full url for the request
        """
        if(not os.environ['FLICKR_API_KEY']):
            raise ValueError('Environement variable "FLICKR_API_KEY" is empty')
        
        current_provider = [provider for provider in config['providers'] if provider['name'] == self.provider_name][0]
        current_provider['query']['text'] = str(query)
        current_provider['query']['api_key'] = os.environ['FLICKR_API_KEY']

        query_strings = helper.build_query_strings(current_provider['query'])

        return current_provider['base_url'] + query_strings


    def normalize(self, response):
        """
        Normalizing the data received from the provider

        Args:
            response ([requests.models.Response]): data from provider

        Returns:
            [dict]: normalized dictonary
        """
        normalize_data = { 'source': self.provider_name, 'photos': [] }
        raw_data = response.json()
        
        for photo in raw_data['photos']['photo']:
            current_photo = self._build_photos_url(photo)
            normalize_data['photos'].append({
                'name': photo['title'],
                "thumbnail": current_photo['thumbnail'],
                "original": current_photo['original']
            })

        return normalize_data


    def _build_photos_url(self, photo):
        """
        Build the flickr format of URL

        Args:
            photo ([dict]): dictonary of flickr photos

        Returns:
            [dict]: dictonary of flickr photos
        """
        extension = '.jpg'
        base_url = 'https://farm%s.staticflickr.com/%s/%s_%s' % (
            photo['farm'],
            photo['server'],
            photo['id'],
            photo['secret']
        )

        return {
            'thumbnail': base_url + '_t' + extension,
            'original': base_url + '_b' + extension
        }