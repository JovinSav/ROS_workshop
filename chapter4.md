<div align="left">
  <a href="https://jovinsav.github.io/Rosworkshop/">HOME</a>
</div>

---
# ROS launch files
For bigger projects it should be not easy to open up differnt terminals to
different nodes and ROS process So **ROS** had provided a solution known as
## Launch files
launch files will run roscore when called and even you can run multiple ros lauch files in a single extention lauch files are generlly in end in ***'my_xxx.launch'***

Lauch files are in XML format

### XML tags in launch files
* *launch* :-parent tag and main tag

```XML
<?xml version="1.0" encoding="UTF-8"?>
<launch>
  <! other between these-->
</launch>
```

 * node
   * arg
   
   ```XML
   <?xml version="1.0" encoding="UTF-8"?>
   <launch>
     <node name ="mynodexyz" pkg="rosbasics" type="pubsub.py">
       <arg name="xyz" default="sfs" value="xxx"/>
     </node>
   </launch>
   ```

## Let's create Launch for our projects
  * create a folder named as ***'launch'***  inside rosbasics folder all your *.launch* files must be in this Folder
  * Create file named Myfirst.launch

   **Myfirst.launch**
   ```XML
   <?xml version="1.0" encoding="UTF-8"?>
   <launch>
     <node name ="turtle1" pkg="turtlesim" type="turtlesim_node"/>
     <node name ="controller" pkg="rosbasics" type="pubsub.py" output="screen"/>
   </launch>

   ```
### Lets RUN it
```bash
roslaunch rosbasics Myfirst.launch
```

<video width="600" height="240" controls preload>
    <source src="nn-2020-04-17_15.05.06.mp4"></source> 
</video>
   
---

<div align="left">
  <a href="https://jovinsav.github.io/Rosworkshop/chapter3.html">Back to:Chapter 3</a>
</div>

<div align="right">
  <a href="https://jovinsav.github.io/Rosworkshop/chapter5.html">Next to:Chapter 5</a>
</div>
