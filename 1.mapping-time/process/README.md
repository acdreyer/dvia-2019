## Process

Description of the contents of this folder and the logic of your data → retinal variables mapping.

-----------------------

### Concept 1: Moving lines/planes

This concept uses moving lines to indicate time. The retinal variable mapping
is done using **position**. 

Whereas this idea might seem very simplistic, the idea is to expand the presentation 
of time in different dimensions; i.e. lateral for seconds, vertical for minutes
and depth for hours (not shown). The third dimension would require 
experimentation to investigate implementation into p5.js using WEBGL.

The expectation is that even though the retinal mapping starts out as **position**,
it ends up becoming **area**, since the box expands into different dimensions, 
giving a sense of the substance of time (related to area or **volume** or weight).

-----------------------

### Concept 2: Spiral

The spiral concept relies on **position** (cross-mapped with **size/orientation**)
to indicate passage of time. It uses the age old aspect of orientation 
(rotation) in one axis, coupled with height (or pitch) in another.
This plays on the idea that time in seconds, 
minutes and hours are permanently linked by a fixed ratio.

The implimentation would be 2D, creating a 3D feel using:\
x = R cos(A*time);\
z = R sin(A*time);\
y = f(time);

where x is horizontal, z "into" the screen and y vertical.
Some experimentation is required with scaling the sines and cosines to represent 
an aesthetically pleasing spiral.
A secondary aspect that might be added is lines connecting some origin to the 
spiral. These lines might be coloured and could possibly add a dimension of **hue**.

-----------------------

### Concept 3: Opaque Inverted Pyramid

The inverted pyramid would be either a 2D illusion of an inverted pyramid, 
viewed from above as squares, or a real 
3D representation of a pyramid (depending on p5.js functionality).

The retinal variable mapping would be **area** (size) and **value** (opacity).
The idea is to create an illusion of a bowl that get filled with murky 
water (viewed from above); which would be similar to opaque sheets of glass 
that get stacked on top of each other.
Every hour that passes would obscure a level (step) of the inverted pyramid and 
create the sense that the object is growing (**area**).






