#include <iostream>

using namespace std;

struct Node
{
    int value;
    struct Node* left;
    struct Node* right;
};

int main() 
{
    Node *Russia = new Node();
    Russia->value = 2018;

    Node *Germany = new Node();
    Germany->value = 2006;

    Node *France = new Node();
    France->value = 1998;

    Node *Mexico = new Node();
    Mexico->value = 1986;

    Russia->left = Germany;
    Russia->right = France;
    France->left = Mexico;

    //    "2018"   
    //     /   \   
    // "2006" "1998"
    //        /
    //     "1986"

    return 0;
}