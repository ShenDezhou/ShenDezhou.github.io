# -*- coding: gb2312 -*-
from PIL import Image
from os import walk

f = []
i=1
for (dirpath, dirnames, filenames) in walk('tmp'):
    for file in filenames:
        print file
        im = Image.open("tmp/" + file)
        w, h = im.size
        ratio=w/1080.0
        h_ = h/ratio
        im.thumbnail((1080, h_))
        im.save("beauty/beauty_0_%d.jpg" % i, 'JPEG')
        i+=1
