// בעצם עכשיו נבנה פונקציה שתעדכן את האלמנט של הhtml ותחזיר אותו
// נגדיר wrapper בעצם מה שמייחד קבוצה של אלמנטים בhtml
// כך נוכל לזהות את דירוג הכוכבים בhtml
function updateStars() {
  const wrappers = document.querySelectorAll(".wrapper"); // מחפשים את כל הקופסאות (wrappers) בעמוד
  let totalStars = 0; // מתחילים עם סכום של 0 כוכבים

  wrappers.forEach((wrapper) => {
    const fullStars = wrapper.querySelectorAll(".fa-star").length; // סופרים כוכבים מלאים
    const halfStars = wrapper.querySelectorAll(".fa-star-half-o").length; // סופרים חצאי כוכבים
    const stars = Math.max(1, Math.min(fullStars + halfStars * 0.5, 5)); // מבטיחים שתמיד יהיו לפחות כוכב 1 ולא יותר מ-5 כוכבים

    let countDisplay = wrapper.querySelector(".count"); // מחפשים אם כבר יש מקום שמראה את מספר הכוכבים
    if (!countDisplay) {
      countDisplay = createElement(wrapper, "span", "count"); // אם אין, יוצרים אחד חדש
    }

    countDisplay.textContent = `${stars} Stars`; // כותבים את מספר הכוכבים שנספרו
    countDisplay.style.color =
      stars <= 2 ? "red" : stars === 3 ? "yellow" : "green"; // צובעים בהתאם לכמות: אדום למעט כוכבים, ירוק להרבה

    totalStars += stars; // מוסיפים את הכוכבים שנספרו לסכום הכולל
  });

  const totalDisplay =
    document.querySelector("#total-stars") ||
    createElement(document.body, "div", "total-stars"); // מחפשים איפה להציג את הסכום הכולל או יוצרים אחד חדש
  totalDisplay.textContent = `TOTAL STARS: ${totalStars}`; // כותבים את הסכום הכולל
}

function handleInteraction() {
  document.querySelectorAll(".wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
      wrapper.style.fontWeight =
        wrapper.style.fontWeight === "bold" ? "normal" : "bold"; // עושים שהכיתוב יתעבה או יחזור לקדמותו בלחיצה
    });

    ["Remove 1 Star", "Add 1 Star", "Remove 0.5 Star", "Add 0.5 Star"].forEach(
      (action) => {
        const button = createElement(wrapper, "button", ""); // יוצרים כפתורים לפעולות
        button.textContent = action; // כותבים מה כל כפתור עושה
        button.addEventListener("click", () => modifyStars(wrapper, action)); // מחברים כל כפתור לפעולה המתאימה
      }
    );
  });
}

function modifyStars(wrapper, action) {
  const fullStars = wrapper.querySelectorAll(".fa-star").length; // סופרים כוכבים מלאים
  const halfStars = wrapper.querySelectorAll(".fa-star-half-o").length; // סופרים חצאי כוכבים
  const totalStars = fullStars + halfStars * 0.5; // מחשבים את סך כל הכוכבים

  if (action === "Remove 1 Star" && fullStars > 0) {
    wrapper.querySelector(".fa-star").remove(); // מסירים כוכב מלא אם יש
  } else if (action === "Add 1 Star" && totalStars < 5) {
    wrapper.insertAdjacentHTML("beforeend", '<i class="fa fa-star"></i>'); // מוסיפים כוכב מלא אם אפשר
  } else if (action === "Remove 0.5 Star" && halfStars > 0) {
    wrapper.querySelector(".fa-star-half-o").remove(); // מסירים חצי כוכב אם יש
  } else if (action === "Add 0.5 Star" && totalStars < 5 && halfStars === 0) {
    wrapper.insertAdjacentHTML(
      "beforeend",
      '<i class="fa fa-star-half-o"></i>'
    ); // מוסיפים חצי כוכב אם אפשר
  }

  enforceStarLimits(wrapper); // בודקים שהכל בסדר עם מספר הכוכבים
  updateStars(); // מעדכנים את התצוגה
}

function enforceStarLimits(wrapper) {
  let stars = wrapper.querySelectorAll(".fa-star, .fa-star-half-o").length; // סופרים כמה כוכבים יש עכשיו

  while (stars < 1) {
    wrapper.insertAdjacentHTML("beforeend", '<i class="fa fa-star"></i>'); // מוסיפים כוכבים אם חסר
    stars++;
  }

  while (stars > 5) {
    wrapper
      .querySelector(".fa-star:last-child, .fa-star-half-o:last-child")
      .remove(); // מסירים כוכבים עודפים
    stars--;
  }
}

function createElement(parent, tag, className) {
  const element = document.createElement(tag); // יוצרים אלמנט חדש
  if (className) element.className = className; // נותנים לו מחלקה אם צריך
  parent.appendChild(element); // מוסיפים אותו לאלמנט ההורה
  return element; // מחזירים את האלמנט שיצרנו
}

updateStars(); // מעדכנים את הכוכבים בהתחלה
handleInteraction(); // מחברים את האינטראקציות

// סיימתי את המטלת בית ויש לי את התשובה
