#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import io
import json
import yaml
import codecs

__version__ = '2016.11.10'
filename = """/Users/cjk/Dropbox/Projects/DAO/refactored_v2.json"""


def main():
    # output = []

    with io.open(filename) as inputFile:
        try:
            json_file = json.load(inputFile)
        except ValueError as e:
            print e
            quit()
    inputFile.close()

    count = 0
    for key, vals in json_file.items():

        # yaml_io_safedump outputs utf8 by default, therefore
        with io.open(key + ".md", mode='w') as outfile:
            outfile.write(u'---\n')
            outfile.write(u'# Jekyll variables\n')
            outfile.write(u'layout: subject\n')
            outfile.write(u'permalink: /subjects/' + key + '\n\n')
            outfile.write(u'# Specific subject values\n')
            yaml.safe_dump(vals, outfile, allow_unicode=True, default_flow_style=False)
            outfile.write(u'---')
        outfile.close()
        print key

if __name__ == '__main__':
    main()
