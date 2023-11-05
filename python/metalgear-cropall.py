from PIL import Image
import glob, os

page = 0
for infile in glob.glob("*.png"):
    file, ext = os.path.splitext(infile)
    with Image.open(infile) as im:
        width, height = im.size
        image_left = im.crop((200 * width / 1920, 0, 961 * width / 1920, height))
        image_left.save(fp = str(page) + ".png", format="png")
        page += 1
        image_right = im.crop(((200 + 761) * width / 1920, 0, (961 + 761) * width / 1920, height))
        image_right.save(fp = str(page) + ".png", format="png")
        page += 1
