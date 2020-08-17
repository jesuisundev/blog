dump = [
    {
        'type': 'folder',
        'name': 'cats',
        'children': [
            {
                'type': 'image',
                'name': 'Buffy'
            },
            {
                'type': 'image',
                'name': 'Gizmo'
            },
            {
                'type': 'folder',
                'name': 'small-cat',
                'children': [
                    {
                        'type': 'image',
                        'name': 'Fluffy'
                    },
                    {
                        'type': 'image',
                        'name': 'Harry'
                    },
                    {
                        'type': 'folder',
                        'name': 'black-cat',
                        'children': [
                            {
                                'type': 'image',
                                'name': 'Daisy'
                            },
                            {
                                'type': 'image',
                                'name': 'Toby'
                            }
                        ]
                    },
                    {
                        'type': 'folder',
                        'name': 'white-cat',
                        'children': [
                            {
                                'type': 'image',
                                'name': 'Minnie'
                            },
                            {
                                'type': 'image',
                                'name': 'Lucy'
                            }
                        ]
                    }
                ]
            },
            {
                'type': 'folder',
                'name': 'future-cat',
                'children': []
            }
        ]
    }
]

cat_names_array = []

def cat_names(folder):
    if not len(folder): return

    for object in folder:
        if object['type'] == 'image':
            cat_names_array.append(object['name'])
        elif object['type'] == 'folder':
            cat_names(object['children'])

cat_names(dump)
print(cat_names_array)
