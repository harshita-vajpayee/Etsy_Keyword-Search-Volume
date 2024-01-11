import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, getDoc, doc, query, where, updateDoc, increment, FieldPath } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBUBRKKE_IEAnjjTNSD4BzVrL5Q6i_xbnA",
    authDomain: "firstproject-e3026.firebaseapp.com",
    projectId: "firstproject-e3026",
    storageBucket: "firstproject-e3026.appspot.com",
    messagingSenderId: "1084988235474",
    appId: "1:1084988235474:web:0e5496552a5dcfc7d9170b",
    measurementId: "G-8BL4XJ0Z9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const Ref = collection(db, "Testing");
const docRef = doc(db, 'Testing', 'TotalCountForPopularity'); // Define Total number of searches of all words
const tableBody = document.getElementById('dTable');

//Sort by Count/Popularity
async function sortPopularity() {
    if (!tableBody) {
        console.error('Table body element not found in the DOM.');
        return;
    }
    // Clear existing table rows
    tableBody.innerHTML = '';

    try {
        const Res = await Ref.orderBy('Count').get();
        const snapshot = await getDocs(Res);
        console.log('Snapshot:', snapshot.docs);

        snapshot.forEach(async(doc) => {
            if (doc.id === 'TotalCountForPopularity') {
                return;
            }
            const rowData = doc.data();
            const row = document.createElement('tr');

            // Create table cells for each field
            const cell1 = document.createElement('td');
            cell1.textContent = rowData.Name;
            row.appendChild(cell1);

            const cell2 = document.createElement('td');
            cell2.textContent = rowData.Count;
            row.appendChild(cell2);

            const cell3 = document.createElement('td');

            const docSnap = await getDoc(docRef)
            const popularity = (rowData.Count / docSnap.data().Count) * 100;
            console.log(docSnap.data().Count)
            cell3.textContent = popularity.toFixed(2);

            tableBody.appendChild(row);
        });

        console.log('Data displayed successfully!');
    } catch (error) {
        console.error('Error fetching and displaying data:', error);
    }
}

// Fetch and display data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("Hello")

    const keywordSearch = document.querySelector('.search');
    let keyword = document.getElementById("keyword");
    let submitButton = document.getElementById("submit");

    console.log(tableBody);

    // Function to display data in the table
    async function displayData() {
        if (!tableBody) {
            console.error('Table body element not found in the DOM.');
            return;
        }
        // Clear existing table rows
        tableBody.innerHTML = '';
        try {
            // Fetch data from Firestore
            const snapshot = await getDocs(Ref);
            console.log('Snapshot:', snapshot.docs);

            snapshot.forEach(async(doc) => {
                if (doc.id === 'TotalCountForPopularity') {
                    return;
                }
                const rowData = doc.data();
                const row = document.createElement('tr');

                // Create table cells for each field
                const cell1 = document.createElement('td');
                cell1.textContent = rowData.Name;
                row.appendChild(cell1);

                const cell2 = document.createElement('td');
                cell2.textContent = rowData.Count;
                row.appendChild(cell2);

                const cell3 = document.createElement('td');

                const docSnap = await getDoc(docRef)
                const popularity = (rowData.Count / docSnap.data().Count) * 100;
                console.log(docSnap.data().Count)
                cell3.textContent = popularity.toFixed(2);

                row.appendChild(cell3);

                tableBody.appendChild(row);
            });

            console.log('Data displayed successfully!');
        } catch (error) {
            console.error('Error fetching and displaying data:', error);
        }
    }


    // Create Event Listener To Allow Form Submission
    submitButton.addEventListener("click", async(e) => {
        // Prevent Default Form Submission Behavior
        e.preventDefault();

        try {
            const q = query(Ref, where("Name", "==", keyword.value));
            const querySnapshot = await getDocs(q);

            const docSnap = await getDoc(docRef)
            console.log(docSnap.data())
                // Update the document with the new count value
            const TC = await updateDoc(docRef, {
                Count: increment(1)
            });
            console.log(TC);
            tableBody.innerHTML = '';


            if (!querySnapshot.empty) {
                for (const doc of querySnapshot.docs) {
                    console.log("Document data:", doc.data());
                    // Use updateDoc correctly
                    const res = await updateDoc(doc.ref, {
                        Count: increment(1)
                    });
                    console.log("Document updated: ", res);
                    const rowData = doc.data();
                    const row = document.createElement('tr');

                    // Create table cells for each field
                    const cell1 = document.createElement('td');
                    cell1.textContent = rowData.Name;
                    row.appendChild(cell1);

                    const cell2 = document.createElement('td');
                    cell2.textContent = rowData.Count;
                    row.appendChild(cell2);

                    const cell3 = document.createElement('td');

                    const popularity = (rowData.Count / docSnap.data().Count) * 100;
                    cell3.textContent = popularity.toFixed(2);
                    row.appendChild(cell3);

                    tableBody.appendChild(row);

                }
            } else {
                const docRef = await addDoc(collection(db, "Testing"), {
                    Name: keyword.value,
                    Count: 1
                });
                console.log("Document written with ID: ", docRef.id);
                const docSnapshot = await getDoc(docRef);
                const rowData = docSnapshot.data();
                const row = document.createElement('tr');

                // Create table cells for each field
                const cell1 = document.createElement('td');
                cell1.textContent = rowData.Name;
                row.appendChild(cell1);

                const cell2 = document.createElement('td');
                cell2.textContent = rowData.Count;
                row.appendChild(cell2);

                const cell3 = document.createElement('td');

                const popularity = (rowData.Count / docSnap.data().Count) * 100;
                cell3.textContent = popularity.toFixed(2);
                row.appendChild(cell3);

                tableBody.appendChild(row);

            }

            // if the keyword contains more than a word like "red warm blankted" then show count of all "red warm blanked","red","warm","blanket"

            const words = keyword.value.split(" ");
            const cleanedWords = words.filter(word => word.trim() !== "");
            console.log(cleanedWords);

            if (cleanedWords.length > 1) {
                cleanedWords.forEach(async(word) => {
                    const q = query(Ref, where("Name", "==", word));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        // Document exists, update Count
                        querySnapshot.forEach(async(doc) => {
                            const res = await updateDoc(doc.ref, {
                                Count: increment(1)
                            });
                            console.log("Document data:", doc.data());
                            const rowData = doc.data();
                            const row = document.createElement('tr');

                            // Create table cells for each field
                            const cell1 = document.createElement('td');
                            cell1.textContent = rowData.Name;
                            row.appendChild(cell1);

                            const cell2 = document.createElement('td');
                            cell2.textContent = rowData.Count;
                            row.appendChild(cell2);

                            const cell3 = document.createElement('td');

                            const docSnap = await getDoc(docRef)
                            const popularity = (rowData.Count / docSnap.data().Count) * 100;
                            cell3.textContent = popularity.toFixed(2)
                            row.appendChild(cell3);

                            tableBody.appendChild(row);
                        });
                    } else {
                        // Document doesn't exist, create a new one
                        const docRef = await addDoc(collection(db, "Testing"), {
                            Name: word,
                            Count: 1
                        });
                        console.log("New document created with ID:", docRef.id);
                        const docSnapshot = await getDoc(docRef);
                        const rowData = docSnapshot.data();
                        const row = document.createElement('tr');

                        // Create table cells for each field
                        const cell1 = document.createElement('td');
                        cell1.textContent = rowData.Name;
                        row.appendChild(cell1);

                        const cell2 = document.createElement('td');
                        cell2.textContent = rowData.Count;
                        row.appendChild(cell2);

                        const cell3 = document.createElement('td');

                        const docSnap = await getDoc(docRef)
                        const popularity = (rowData.Count / docSnap.data().Count) * 100;
                        cell3.textContent = popularity.toFixed(2);
                        row.appendChild(cell3);

                        tableBody.appendChild(row);
                    }

                });
            } else {
                console.log("No words to process");
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    });
    displayData();

});


//Sort function this is not available right now. Its written though.It needs simple query
function handleFilterChange() {
    const filterSelect = document.getElementById('filterSelect');
    const selectedOption = filterSelect.value;

    if (selectedOption === 'popularity') {
        console.log("Popularity")
            // Call the sortPopularity function
        sortPopularity();
    } else if (selectedOption === 'volume') {
        // Call another function for sorting by volume if needed
    }
}