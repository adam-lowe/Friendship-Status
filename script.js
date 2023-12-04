document.getElementById('addFriendBtn').addEventListener('click', function() {
    document.getElementById('friendForm').style.display = 'block';
});

function addFriend() {
    var friend = {
        name: document.getElementById('name').value,
        timezone: document.getElementById('timezone').value,
        lastInteraction: document.getElementById('lastInteraction').value,
        lastActivity: document.getElementById('lastActivity').value,
        notes: document.getElementById('notes').value
    };

    // Add to local storage
    var friends = JSON.parse(localStorage.getItem('friends') || '[]');
    friends.push(friend);
    localStorage.setItem('friends', JSON.stringify(friends));

    addFriendToList(friend, friends.length - 1);

    // Reset form
    document.getElementById('friendForm').style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('timezone').value = '';
    document.getElementById('lastInteraction').value = '';
    document.getElementById('lastActivity').value = '';
    document.getElementById('notes').value = '';
}

function addFriendToList(friend, index) {
    // Create list item
    var li = document.createElement('li');
    li.classList.add('friendItem');
    li.innerHTML = `
        <p>Name: ${friend.name}</p>
        <p>Timezone: ${friend.timezone}</p>
        <p>Last Interaction: ${friend.lastInteraction}</p>
        <p>Last Activity: ${friend.lastActivity}</p>
        <p>Notes: ${friend.notes}</p>
        <button onclick="toggleDetails(this)">Expand</button>
        <button onclick="removeFriend(${index})">Remove</button>
        <div class="details" style="display: none;">
            <!-- Add detailed availability info here -->
        </div>
    `;
    document.getElementById('friendList').appendChild(li);
}

function toggleDetails(button) {
    var details = button.nextElementSibling;
    var isVisible = details.style.display === 'block';
    details.style.display = isVisible ? 'none' : 'block';
    button.textContent = isVisible ? 'Expand' : 'Collapse';
}

function removeFriend(index) {
    var friends = JSON.parse(localStorage.getItem('friends') || '[]');
    friends.splice(index, 1); // Remove the friend from the array
    localStorage.setItem('friends', JSON.stringify(friends)); // Update local storage
    document.getElementById('friendList').innerHTML = ''; // Clear the list
    friends.forEach(addFriendToList); // Re-add remaining friends to the list
}

// Load friends from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    var friends = JSON.parse(localStorage.getItem('friends') || '[]');
    friends.forEach((friend, index) => addFriendToList(friend, index));
});
