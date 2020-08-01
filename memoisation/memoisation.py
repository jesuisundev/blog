import time

class Memoization():
    def __init__(self):
        self.my_hash_map = {}

    def expensive_function (self, parameter):
        if parameter in self.my_hash_map:
            print('Instant response !')
            return self.my_hash_map[parameter]

        print('First time, long process...')
        time.sleep(1)

        result = '%s-memoized' % (parameter)

        self.my_hash_map[parameter] = result

        return result

    def do_stuff(self):
        self.expensive_function('superToto') # First time, long process...
        self.expensive_function('superToto') # Instant response !
        self.expensive_function('superToto') # Instant response !
        self.expensive_function('superTata') # First time, long process...
        self.expensive_function('superTata') # Instant response !
        self.expensive_function('superToto') # Instant response !

Memoization().do_stuff()