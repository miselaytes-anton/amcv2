# This import registers the 3D projection, but is otherwise unused.
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401 unused import

import json
from matplotlib import cbook
from matplotlib import cm
from matplotlib.colors import LightSource
import matplotlib.pyplot as plt
import numpy as np
import sys

with open(sys.argv[1], 'r') as json_file:
  data = np.array(json.load(json_file))

z = data
# nrows => num time frames
# ncols => num frequency bins
nTimeFrames, nFreqBins = z.shape
x = np.linspace(0, nFreqBins, nFreqBins)
y = np.linspace(0, nTimeFrames, nTimeFrames)
x, y = np.meshgrid(x, y)
#time, freq
region = np.s_[0:50, 0:100]
x, y, z = x[region], y[region], z[region]

fig, ax = plt.subplots(subplot_kw=dict(projection='3d'))
ax.set_xlabel('x:frequency')
ax.set_ylabel('y:time')
ax.set_zlabel('z:amplitude')
ls = LightSource(270, 45)
# To use a custom hillshading mode, override the built-in shading and pass
# in the rgb colors of the shaded surface calculated from "shade".
rgb = ls.shade(z, cmap = plt.get_cmap('gist_earth'), vert_exag=0.1, blend_mode='soft')
surf = ax.plot_surface(x, y, z, rstride=1, cstride=1, facecolors=rgb,
                       linewidth=0, antialiased=False, shade=False)
plt.show()

#https://matplotlib.org/examples/color/colormaps_reference.html
#https://matplotlib.org/gallery/mplot3d/custom_shaded_3d_surface.html#sphx-glr-gallery-mplot3d-custom-shaded-3d-surface-py
#https://docs.scipy.org/doc/numpy/reference/generated/numpy.meshgrid.html
#https://stackoverflow.com/questions/9170838/surface-plots-in-matplotlib