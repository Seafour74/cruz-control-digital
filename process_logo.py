from PIL import Image
import numpy as np

img = Image.open('/Users/devindipprey/.gemini/antigravity/brain/02d3c0c3-b497-4d1a-b2cf-73e7352da511/logo_with_text_1781914297823.png').convert('RGBA')
data = np.array(img)

r, g, b, a = data.T

background = (r < 60) & (g < 60) & (b < 60)
data[..., 3][background.T] = 0

img_clean = Image.fromarray(data)

bbox = img_clean.getbbox()
if bbox:
    img_clean = img_clean.crop(bbox)

img_clean.save('images/logo_transparent.png')
