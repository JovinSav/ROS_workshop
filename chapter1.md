<div align="left">
  <a href="https://jovinsav.github.io/Rosworkshop/">HOME</a>
</div>
---

# Welocme to introdution to  ROS
I hope all have installed Vritual box and and installed the ROSworkshop image which contain ROS
open termial with
shortcut
```
Ctrl+Alt+t
```
Let's make our first ROS workspace
```bash
mkdir -p ROS_workspace/src
```
the above will create a ROS work workspace
**ROS_workspace** repalce it with a name you are comfortable with names like below
* ROS_ws
* my_ws
* mypacks
* mypacks_ws

For this workshop the Drirectory  name is **ROSworksop**


 Now move to directory of **ROSworksop** and then to ***src*** folder using terminal commands
 this can be done in two methods
 * first method
 ```bash
cd ROSworksop
cd src
 ```
 * Second method
 ```bash
cd ROSworksop/src
 ```

---
## Creating a package
 make sure you are in ***src***
 ```bash
catkin_create_pkg package_name <depend1> <depend2> <...> etc
 ```
example
 ```bash
catkin_create_pkg ros_basics roscpp rospy std_msgs
 ```

go back to directory of **ROSworksop** from src folder
```bash
cd ..
```
Now final commands
*  first
```bash
catkin_make
```
* after that
```bash
#to move from directory to home
cd ..
```
* then to enable this package in ROS native packs you can do in 2 methods
```bash
source ~/ROSworksop/devel/setup.sh
# each time you need to do above command
# when open termial if you did'nt added to .bashrc file
# to avoid it
echo "source ~/ROSworksop/devel/setup.sh" >> .bashrc
```
---
<div align="right">
  <a href="https://jovinsav.github.io/Rosworkshop/chapter2.html">Next to:Chapter 2</a>
</div>

