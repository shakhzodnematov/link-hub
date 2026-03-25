import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "Sizning_apiKey",
  authDomain: "loyiha-id.firebaseapp.com",
  projectId: "loyiha-id",
  storageBucket: "loyiha-id.appspot.com",
  messagingSenderId: "Sizning_messagingSenderId",
  appId: "Sizning_appId"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchLinks() {
    const linksContainer = document.getElementById('links-container');
    
    try {
        const linksQuery = query(collection(db, "links"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(linksQuery);
        
        linksContainer.innerHTML = ''; 
        
        if (querySnapshot.empty) {
            linksContainer.innerHTML = '<p style="text-align: center; font-weight:600; font-size: 0.9rem; width: 100%;">Hozircha linklar kiritilmagan.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            createLinkElement(data, linksContainer);
        });
        
    } catch (error) {
        console.warn("Test rejim (Firebase ulanmagan):", error.message);
        
        // Loaderni tozalash
        linksContainer.innerHTML = ''; 
        
        // Faqat matnli toza (clean) linklar (rasmdagidek)
        const mockLinks = [
            { title: "Facebook", url: "#" },
            { title: "Instagram", url: "#" },
            { title: "Xizmatlar", url: "#" },
            { title: "Portfolio", url: "#" }
        ];

        mockLinks.forEach((data) => {
            createLinkElement(data, linksContainer);
        });
    }
}

function createLinkElement(data, container) {
    const linkElement = document.createElement('a');
    linkElement.href = data.url;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";
    linkElement.className = "pill-link";
    linkElement.textContent = data.title;
    
    container.appendChild(linkElement);
}

document.addEventListener('DOMContentLoaded', fetchLinks);
