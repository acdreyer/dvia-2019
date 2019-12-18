## Process Documentation
----------------------

Stones unturned: Project 3: Mapping earthquake data onto a map

This section relates to the concepts of showing non-spatial data before applying it to
the spatial map.


-------------------------

### Concept 1:

The first concept relies on conveying the information of earthquake depth and/or magnitude
through the retinal variable of **shape** and **size* directly onto the map as a marker.
The idea is to create an icon that will show the value type through a visual 
language related to earthquakes (i.e. a crack in the ground or a vibration wave.)


![Concept1](StonesUnturned-concept1.jpg)


### Concept 2:

The 2nd concept is to show the depth and depth uncertainty values over time by using the retinal
variables of **position** and **length** respectively. For this purpose a bar will be 
drawn on a set of axes normal x- and y- axes. 
The vertical position of the bar will indicate the depth, whereas the length
will indicate the margin of uncertainty related to depth (i.e. earthquake depth error.)
It is also envisioned to possibly map the earthquake magnitude as **colour/hue**.

![Concept2](StonesUnturned-concept2.jpg)

### Concept 3:

The final concept is a traditional grouped bar chart that shows the 
earhquake frequency vs. magnitude for earthquakes over the past 4 weeks (1 month).
Categorical colour mapping would be used to indicate which period each bar belongs to.
Whereas this concept does add the ability to relate magnitude and no. of occurences
more directly, the benefit of having a direct time history is lost.

![Concept3](StonesUnturned-concept3.jpg)


### Final Implimentation:
--------------------

The final implementation default view is shown below. The main map is shown on
the left-hand side and implemented with Leaflet.js. The area on the right is
a P5.js canvas that plots two bar charts; firstly for the earthquake depth and
secondly for the earhquake distance toward the closest tectonic plate boundary.


![Final](finalMainview.PNG)



It was decided to modify concept 1 by adding markers to the map that resemble
seismic waves using concentric circles to create the visual effect of the
vibrations circling out from the earthquake epicentre. The scale of the
circle maximum diameter is mapped to the retinal variable of **size** with
the base color of red to create a contrast to the background of the ocean. 
Furthermore, the circles are plotted with some transparency in order to overlay them
and show density of many that overlap on a given location.


![Final](markers.PNG)

A primary focuspoint of the design is an interactive interface that allows the user
to cycle through the individual events using a slider above the chart area.
A slider was chosen instead of a mouseover/hover functionality to aid development
and increase selection reliability.

![Final](finalMainview2.PNG)

A secondary filter was also built into the chart
whereby the Map pan and zoom would result in highlighting 
only bars that correspond to seismic events that are on the map view.

Both the slider selection and map view selections were implemented by
adding `IF` statements in the P5 draw loop to change the fill color of a bar
when that bar corresponds to either the associated slider value and/or when it
falls into the range of coordinates that are in the map window rectangle (inbetween
the South-West and North-East corners). Since each of the bars has to be
drawn in every draw loop irrespective of their color, only the fill color
for that bar is changed based on the selection criteria of it being in the map
window, outside the map window, or corrsponding to the slider selection.
 Currently the marker in the map view will follow the slider as part of
Leaflet base functionality, however the slider does not follow the map click event.
A future improvement could be to also bind the slider position to a clicked
marker.

![Final](finalMainview3.PNG)


Additional information is also made available to the user through a popup menu on each
marker that contains the relevant information.

![Final](markers_popup.PNG)