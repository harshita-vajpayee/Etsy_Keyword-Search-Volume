import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

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
const docRef = doc(db, 'Testing', 'TotalCountForPopularity'); // Define docRef here

document.addEventListener('DOMContentLoaded', function() {
    console.log("Hello")

    //display top 3
    async function display() {
        try {
            const q = query(Ref, orderBy('Count', 'desc'), limit(4));
            const snapshot = await getDocs(q);
            var index = 0;

            snapshot.forEach(async(doc) => {
                if (doc.id === 'TotalCountForPopularity') {
                    return;
                }
                console.log(index);
                const rowData = doc.data();
                if (index == 0) {
                    const cell1 = document.getElementById('first');
                    cell1.innerHTML = rowData.Name;
                    document.getElementById('firstC').innerHTML = "Search Count : " + rowData.Count;
                }
                if (index == 1) {
                    document.getElementById('second').innerHTML += rowData.Name;
                    document.getElementById('secondC').innerHTML = "Search Count : " + rowData.Count;
                }
                if (index == 2) {
                    document.getElementById('third').innerHTML = rowData.Name;
                    document.getElementById('thirdC').innerHTML = "Search Count : " + rowData.Count;
                }
                console.log(rowData.Name);
                index = index + 1;

            });
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data().Count);
            document.getElementById('TC').innerHTML += docSnap.data().Count;

        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    }
    display();

});