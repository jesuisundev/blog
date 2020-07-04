from collections import deque 
  
myStack = deque() 

# push operation
myStack.appendleft(1998) 
myStack.appendleft(2006) 
myStack.appendleft(2018) 

# top operation
print(myStack[0])
  
# pop operation
print(myStack.popleft()) 

# isEmpty operation
print(len(myStack))