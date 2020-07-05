#include<iostream> 
#include<forward_list>  

using namespace std; 

int main() 
{
    forward_list<int> myLinkedList;

    myLinkedList.assign({1998, 2018, 2020});

    // insert operation
    myLinkedList.insert_after(myLinkedList.begin(), 2006);

    // remove operation
    myLinkedList.remove(2020);

    // front  operation
    cout << "Show front on the linked list : " << myLinkedList.front() << "\n";

    // isEmpty operation
    cout << "\nqueue is empty ? " << myLinkedList.empty() << "\n";

    cout << "The forward list after insert_after operation : ";

    for (int&node : myLinkedList) 
        cout << node << " ";
    cout << endl;

    return 0;
}