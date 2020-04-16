# Let's understand ROS framework


## ROS nodes
 Every process in ROS consider as nodes and depending upon the behaviors of these nodes they are catogarised into
 * Master node
 * Publisher/Subscriber nodes
 * Service nodes
 * action nodes

In the above ***Master Node*** is a unquine node which take care of logs of all other types of nodes and all the history of other nodes at a time there can be only one ***Master Node*** running in the section

so to visualise the above we can you ROS native package ***turtle_sim***.

open terminal

```
Ctrl+Alt+t
```
* Run master node aka **roscore**
``` bash
roscore
```
* open new terminal
``` bash
rosrun turtlesim turtlesim_node
```
* open new terminal
``` bash
rqt_graph
```
* open new terminal
``` bash
rosrun turtlesim turtle_teleop_key
```
use arrow key to move the turtle

In the gui window open for **rqt_graph** we have two oval shape objects with text in it and arrow connecting  them above the arrow some text is written these are known as Topics

for debugging
* use **rqt_graph** or use the below to check all the node are running
```bash
rosnode list
```
which outputs
```
/rosout
/teleop_turtle
/turtlesim
```

## ROS Topics
Topics are data vector name given by the user to using ROS message(ROSmsg) structures
topics may be of native ROSmsg or an User defined ROSmsg which is a combination of native ROSmsgs
## ROS message
As disscused above the structure in which ROS topic publish data is in ROSmsg either
you can use native ROSmsg structure or you can create your own ROSmsgs with combiations of native ROSmsgs.

To view the pulished data in topic for above example
* open new terminal and type
```bash
rosmsg list
```
* To show structure of ROSmsg-simple
```bash
rosmsg show std_msgs/Float32
```
```
 float32 data
```
above is simple rosmsg struture **std_msgs** is the stuture containor and Float32 is data formats ***'data'*** is the variable
* To show structure of ROSmsg-complex
```bash
rosmsg show geometry_msgs/Twist
```
which will output
```
 geometry_msgs/Vector3 linear
  float64 x
  float64 y
  float64 z
geometry_msgs/Vector3 angular
  float64 x
  float64 y
  float64 z
```
## Let us view the cmd_vel topic
To view the pulished data in topic for above example
open new terminal and type
```bash
rostopic echo /turtle1/cmd_vel
```
here  **/turtle1/cmd_vel** is the topic name which has ROSmsg structure

for debugging
* use **rqt_graph** or use the below to check all the node are running
```bash
rostopic list
```
which outputs
```
/rosout
/rosout_agg
/turtle1/cmd_vel
/turtle1/color_sensor
/turtle1/pose
```

