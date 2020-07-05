from collections import deque 
  
myQueue = deque() 

# push operation
myQueue.append(1998) 
myQueue.append(2006) 
myQueue.append(2018) 

# top operation
print(myQueue[0])
  
# pop operation
print(myQueue.popleft())

# isEmpty operation
print(len(myQueue))