import time
import board
import neopixel
import sys

r="ff"
g"ff"
b="ff"

try:
    print(sys.argv)
    rgb = sys.argv[1]
    r = (rgb[1:3])
    g = (rgb[3:5])
    b = (rgb[5:7])
except:
    rgb=""
    pass

# Choose an open pin connected to the Data In of the NeoPixel strip, i.e. board$
# NeoPixels must be connected to D10, D12, D18 or D21 to work.
pixel_pin = board.D18
 
# The number of NeoPixels
num_pixels = 24
 
# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green$
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.GRB

def run(r=r, g=g, b=b):
    for pixel in range(num_pixels):    
        pixels = neopixel.NeoPixel(
            pixel_pin, num_pixels, brightness=0.2, auto_write=False, pixel_order=ORDER
        )

        pixels.fill((   int(r, 16) , int(g, 16) , int(b, 16)    ))
            # Uncomment this line if you have RGBW/GRBW NeoPixels
            # pixels.fill((255, 0, 0, 0))

        pixels.show()