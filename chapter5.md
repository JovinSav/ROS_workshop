<div align="left">
  <a href="https://jovinsav.github.io/Rosworkshop/">HOME</a>
</div>

---
# ROS messages
Nodes communicate with each other by publishing messages to topics. A message is a simple data structure, comprising typed fields. Standard primitive types (integer, floating point, boolean, etc.) are supported, as are arrays of primitive types. Messages can include arbitrarily nested structures and arrays (much like C structs).

msgs are just simple text files with a field type and field name per line. The field types you can use are:
* int8, int16, int32, int64 (plus uint*)
* float32, float64
* string
* time, duration
* other msg files
* variable-length array[] and fixed-length array[C]

# Let us create message file
As disscussed above message files are made in **'msg'** folder located in side the package inside which has extention ***'xxx.msg'***

A typical ***'xxx.msg'*** file look like below
```msg
float32 data1
float64 data2
```
So for this tutorial we are going to create a message file named as ***'my_msg.msg'***

***'my_msg.msg'***
```msg
int32 count
float64 add
float64 sub
```
* after createing in the above file save and close then open ***'package.xml'*** located in rosbasics Folder add lines and savefile and close
 ```XML
 <build_depend>message_generation</build_depend>
 <exec_depend>message_runtime</exec_depend>
 ```
* then open ***'CMakeLists.txt'*** located in rosbasics Folder add lines and savefile and close
* >Ctrl+F and search **"find_package"** and add the line

```python
 find_package(catkin REQUIRED COMPONENTS
   roscpp
   rospy
   std_msgs
   message_generation ##add this line
)
 ```
  * >Ctrl+F and search **"catkin_package"** and add the this  lines ,this is to  make sure you export the message runtime dependency.

```python
 catkin_package(
  # INCLUDE_DIRS include
  #  LIBRARIES rosbasics
  CATKIN_DEPENDS roscpp rospy std_msgs message_runtime #remove comment
  # also add message_runtime
  #  DEPENDS system_lib
 )
 ```

* >Ctrl+F and search **"add_message_files"** and remove ***'#'*** and add

```python
 add_message_files(
   FILES
   my_msg.msg #add this line
#   Message1.msg
#   Message2.msg
 )
 ```
* >Ctrl+F and search **"generate_messages"** and remove ***'#'***
 ```python
 generate_messages(
   DEPENDENCIES
   std_msgs
 )
````

After this steps save and close ***'CMakeLists.txt'*** and open terminal
 ```bash
 cd cd ROS_Worksop/
 catkin_make
 ```
 Make sure previous steps have no errors to check message created

 ```bash
 rosmsg show rosbasics/my_msg
 ```
 which outputs
 ```
int32 count
float64 add
float64 sub
 ```
 ___
 # Now that we have created ROS message we create an publisher
 A publsiher which publish in our ROSmsg structure .In ***'src'*** create ***'my_msgpub.py'***

 ***'my_msgpub.py'***
 ```python
 #!/usr/bin/python

 import rospy
 from rosbasics.msg import my_msg
 def main():
  rospy.init_node("my_msgpub",anonymous=False)
  pub =rospy.Publisher("/mymsg",my_msg,queue_size=0)
  count=0
  data=my_msg()
  r=rospy.Rate(hz=10)
  while not rospy.is_shutdown():
    x,y=map(float,raw_input("input x,y :\t").split())
    data.add=x+y
    data.sub=x-y
    data.count=count
    count+=1
    pub.publish(data)
    r.sleep()

 if __name__ == '__main__':
     try:
         main()
     except rospy.ROSInterruptException:
         pass
 ```
 ## Important Points with Creating ROSmsgs
 * Create ROSmsgs only if requried
 * Most of required meassage strutures are builded inside **ros** so try not waste time in your project createing new Messages
 * if more message are created make sure you done all steps once.
 * In the steps in ***'CMakeLists.txt'*** add addtional FILES
 ```python
 add_message_files(
   FILES
   my_msg.msg #add this line
   xxx1.msg #new msg no. 1
    xxx2.msg #new msg no. 2
#   Message1.msg
#   Message2.msg
 )
 ```
 * Then do ***'catkin_make'***
___
# DIY
1. create subscriber to subsribe for above published topic
2. create ROSmsg with output fibonocci series and Arethemetic progression
 ```
 int32 count
 float64[] fibonocci
 float64[] ap

 ```
---
* [HOME](https://jovinsav.github.io/Rosworkshop/)
* [Back to:Chapter 4](https://jovinsav.github.io/Rosworkshop/chapter4.html)
* [Next :Chapter 6](https://jovinsav.github.io/Rosworkshop/chapter6.html)
