import json

with open("countries.json", 'r+') as raw:
    file = json.load(raw)
    x = 0
    countries = []
    for country in file['features']:
        new_c = {'name': country['properties']['COUNTRY'], 'coordinates': country['geometry']["coordinates"]}
        countries.append(new_c)

with open("format.json", "w") as raw:
    json.dump(countries, raw, indent=4)