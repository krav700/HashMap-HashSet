export function LinkedList() {
    let head = NodeF();
    let tail = NodeF();

    function append(value) {
        if (head.value == null) {
            head.value = value;
            tail.value = value;
            return;
        }

        const newNode = NodeF(value);
        let currentNode = head;

        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
        }
        currentNode.nextNode = newNode;
        tail = newNode;
    }

    function prepend(value) {
        if (head.value == null) {
            head.value = value;
            return;
        }
        if (tail.value == null) {
            tail.value = value;
            return;
        }

        let newNode = NodeF(value);
        newNode.nextNode = head;
        head = newNode;
    }

    function size() {
        if (head.value == null) {
            return 0;
        }

        let count = 1;
        let currentNode = head;
        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
            count++;
        }
        return count;
    }

    function at(index) {
        try {
            let currentNode = head;
            for (let i = 0; i < index; i++) {
                currentNode = currentNode.nextNode;
            }
            return currentNode.value;
        } catch {
            console.log("No such node!\n");
        }
    }

    function pop() {
        if (head.value == null) {
            console.log("No head node");
            return;
        }

        let currentNode = head;

        while (currentNode.nextNode.nextNode != null) {
            currentNode = currentNode.nextNode;
        }

        let lastElement = currentNode.nextNode;
        currentNode.nextNode = null;
        return lastElement;
    }

    function contains(value) {
        if (head.value == null) {
            console.log("No head node");
            return;
        }

        let currentNode = head;

        while (currentNode.nextNode != null) {
            if (currentNode.value == value) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }

        if (currentNode.value == value) {
            return true;
        }

        return false;
    }

    function find(value) {
        if (head.value == null) {
            console.log("No head node");
            return;
        } else if (head.value == value) {
            return 0;
        }

        let currentNode = head;
        let index = 0;
        while (currentNode.nextNode != null) {
            if (currentNode.value == value) {
                return index;
            }
            currentNode = currentNode.nextNode;
            index++;
        }
        if (currentNode.value == value) {
            return index;
        }

        return null;
    }

    function toString() {
        if (head.value == null) {
            console.log("No head node");
            return "";
        }

        let currentNode = head;
        let wholeList = "";
        while (currentNode.nextNode != null) {
            wholeList += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
        }
        wholeList += `( ${currentNode.value} ) -> `;
        wholeList += " null";
        return wholeList;
    }

    function insertAt(value, index) {
        try {
            if (index == 0) {
                let newNode = NodeF(value);
                newNode.nextNode = head;
                head = newNode;
                return;
            }

            let currentNode = head;
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.nextNode;
            }
            let newNode = NodeF(value);
            let oldNodeAtIndex = currentNode.nextNode;
            currentNode.nextNode = newNode;
            newNode.nextNode = oldNodeAtIndex;
        } catch {
            console.log("Error with insertAt");
        }
    }

    function removeAt(index) {
        try {
            if (index == 0) {
                if (head.nextNode) {
                    head = head.nextNode;
                    return;
                }
                head.value = null;
                head.nextNode = null;
                return;
            }

            let currentNode = head;
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.nextNode;
            }

            currentNode.nextNode = currentNode.nextNode.nextNode;
        } catch {
            console.log("Error with removeAt");
        }
    }

    return {
        append,
        prepend,
        size,
        get head() {
            return head;
        },
        get tail() {
            return tail;
        },
        at,
        pop,
        contains,
        find,
        toString,
        insertAt,
        removeAt,
    };
}

function NodeF(value = null, nextNode = null) {
    return { value, nextNode };
}
