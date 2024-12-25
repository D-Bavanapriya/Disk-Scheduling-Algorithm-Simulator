# Disk-Scheduling-Algorithm-Simulator
The Disk Scheduling Algorithm Simulator is a comprehensive web-based tool designed to visualize and simulate the workings of various disk scheduling algorithms used in operating systems. Disk scheduling is a critical task in operating systems to determine the most efficient way to service disk I/O requests. This simulator provides an interactive platform where users can experiment with different algorithms to understand their behavior and efficiency in handling disk requests.

# Key Features
# Interactive User Interface:

The simulator features an intuitive and user-friendly interface where users can input disk requests, select a scheduling algorithm, specify the initial disk head position, and define the maximum disk size.
The input is processed in real-time, and the results, including the head movements, are displayed graphically.
Supported Disk Scheduling Algorithms:

# FCFS (First-Come, First-Served):
Services disk requests in the order they arrive, with no regard to their position on the disk.
# SSTF (Shortest Seek Time First): 
Selects the disk request closest to the current head position to minimize seek time.
# SCAN: 
Moves the disk head in one direction, servicing requests along the way until the end of the disk is reached, then reverses direction.
# C-SCAN (Circular SCAN):
Similar to SCAN but only moves in one direction, and once the end is reached, it jumps back to the beginning.
# LOOK: 
Similar to SCAN but only goes as far as the last request in the current direction, then reverses.
# C-LOOK (Circular LOOK): 
Moves in one direction like C-SCAN but only goes as far as the last request, then jumps back to the start.
# Graphical Visualization:

The disk scheduling process is visually represented on an HTML5 canvas, allowing users to see the movement of the disk head across different requests.
The tool plots the steps taken by the disk head, highlights key points (initial, intermediate, and final positions), and shows the path it follows.
# Real-Time Computation:

After selecting an algorithm and inputting the data, the simulator computes the total seek time—the sum of all the distances the disk head must travel to complete all the requests.
The graphical output dynamically updates to reflect the disk head’s movement, with a step-by-step breakdown of how each request is serviced.
Performance Comparison:

By simulating multiple algorithms, users can compare the efficiency of different approaches in terms of seek time, order of execution, and overall performance.
This tool helps users visualize how different scheduling techniques behave under various conditions, making it easier to grasp the trade-offs involved in disk scheduling.
How It Works
# Input Parameters: 
Users provide the following inputs:

A list of disk requests (positions on the disk platter).
The initial position of the disk head (where the head starts).
The maximum disk size (to simulate real-world disk constraints).
Selection of the scheduling algorithm (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK).
Simulation: The chosen algorithm determines how the requests will be processed. The disk head’s movement is simulated, and the total seek time is calculated.

# Visualization: 
The path of the disk head is drawn on a canvas element. Different points (start, intermediate steps, end) are highlighted to give a clear understanding of how the algorithm processes the disk requests.

Results: The total seek time and the order of execution are displayed, allowing users to compare the effectiveness of different algorithms.

# Applications and Use Cases
Educational Tool: The simulator is designed to help students, educators, and professionals gain a deeper understanding of disk scheduling algorithms. By providing visual and interactive simulations, users can see how each algorithm impacts disk performance.
Performance Testing: Users can experiment with various request sequences, head positions, and disk sizes to test the performance of different algorithms in different scenarios.
Concept Reinforcement: The step-by-step breakdown of how requests are handled reinforces the understanding of algorithmic trade-offs, particularly in terms of seek time optimization.
