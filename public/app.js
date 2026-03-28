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

const getIconForTitle = (title) => {
    const t = title.toLowerCase();
    if (t.includes('facebook')) return 'fa-brands fa-facebook-f';
    if (t.includes('instagram')) return 'fa-brands fa-instagram';
    if (t.includes('telegram')) return 'fa-brands fa-telegram';
    if (t.includes('youtube')) return 'fa-brands fa-youtube';
    if (t.includes('tiktok')) return 'fa-brands fa-tiktok';
    if (t.includes('linkedin')) return 'fa-brands fa-linkedin-in';
    if (t.includes('xizmat')) return 'fa-solid fa-briefcase';
    if (t.includes('portfolio') || t.includes('loyiha')) return 'fa-solid fa-folder-open';
    if (t.includes('kurs')) return 'fa-solid fa-graduation-cap';
    if (t.includes('aloqa') || t.includes('konsul')) return 'fa-solid fa-headset';
    return 'fa-solid fa-link';
};

async function fetchLinks() {
    const linksContainer = document.getElementById('links-container');
    
    try {
        const linksQuery = query(collection(db, "links"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(linksQuery);
        
        linksContainer.innerHTML = ''; 
        
        if (querySnapshot.empty) {
            linksContainer.innerHTML = '<p style="text-align: center; font-weight:500; font-size: 0.95rem; color: #a1a1aa; width: 100%;">Hozircha linklar kiritilmagan.</p>';
            return;
        }

        let index = 0;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            createLinkElement(data, linksContainer, index);
            index++;
        });
        
    } catch (error) {
        console.warn("Test rejim (Firebase ulanmagan):", error.message);
        
        linksContainer.innerHTML = ''; 

        const mockLinks = [
            { title: "Mening Instagramim", url: "#" },
            { title: "Telegram Kanal: Biznes Sirlari", url: "#" },
            { title: "Bepul Konsultatsiya", url: "#" },
            { title: "Mening Portfolioim", url: "#" }
        ];

        mockLinks.forEach((data, index) => {
            createLinkElement(data, linksContainer, index);
        });
    }
}

function createLinkElement(data, container, index = 0) {
    const linkElement = document.createElement('a');
    linkElement.href = data.url;
    linkElement.target = "_blank";
    linkElement.rel = "noopener noreferrer";
    linkElement.className = "glass-link";
    linkElement.style.animationDelay = `${index * 0.1}s`;
    
    // Top icon
    const iconBase = document.createElement('i');
    iconBase.className = `${getIconForTitle(data.title)} link-icon`;
    
    // Middle text content
    const contentDiv = document.createElement('div');
    contentDiv.className = "link-content";
    
    const textSpan = document.createElement('span');
    textSpan.textContent = data.title;
    
    contentDiv.appendChild(textSpan);
    
    // Bottom right arrow
    const arrowIcon = document.createElement('i');
    arrowIcon.className = "fa-solid fa-arrow-right link-arrow";
    
    linkElement.appendChild(iconBase);
    linkElement.appendChild(contentDiv);
    linkElement.appendChild(arrowIcon);
    
    container.appendChild(linkElement);
}

document.addEventListener('DOMContentLoaded', fetchLinks);
