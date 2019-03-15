
// async await
async function getComments() {
  const response = await fetch('http://localhost:3000/comments');
  const comments = await response.json();
  console.log(comments);
}

async function getComment(id) {
  const response = await fetch(`http://localhost:3000/comments/${id}`);
  const comment = await response.json();
  return response.status >= 400 ? alert('Greska') : alert(JSON.stringify(comment));
}


async function postComment(data) {
  let response;
  const serverUrl = 'http://localhost:3000';
  try {
    response = await fetch(`${serverUrl}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}

async function postAuthor(data) {
  let response;
  const serverUrl = 'http://localhost:3000';
  try {
    response = await fetch(`${serverUrl}/authors`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
}

async function sortPostsById() {
  const serverUrl = 'http://localhost:3000';
  const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();
  for (const v of posts) {
    const postAuthorId = v.authorId;
    const postId = v.id;
    const authorResponse = await fetch(`${serverUrl}/authors/${postAuthorId}`);
    const author = await authorResponse.json();
    console.log(`${v.title} - ${author.name}`);
    const commentResponse = await fetch(`${serverUrl}/comments`);
    const comment = await commentResponse.json();
    console.log('Komentari:');
    for (const k of comment) {
      const authorResponse = await fetch(`${serverUrl}/comments/${k.authorId}`);
      const authorC = await authorResponse.json();
      if (postId == k.postId) {
        console.log(`${k.body} Autor komentara: ${author.name}`);
      }
    }
  }
}

// async function writeOut() {
//     const serverUrl = `http://localhost:3000`;
//     let response = await fetch("http://localhost:3000/posts");
//     let posts = await response.json();
//     for (let v of posts) {
//         let postTittle = document.getElementById('postTittle');
//         let postAuthorId = v.authorId;
//         let postId = v.id;
//         let authorResponse = await fetch(`${serverUrl}/authors/${postAuthorId}`);
//         let author = await authorResponse.json();
//         if (postId === author.id) {
//             postTittle.innerHTML = `${v.title} od autora ${author.name}`;
//         }
//         // console.log(`${v.title} - ${author.name}`);
//         let commentResponse = await fetch(`${serverUrl}/comments`)
//         let comment = await commentResponse.json();
//         console.log("Komentari:");
//         for (let k of comment) {
//             let commentSpan = document.getElementById("commentSpan");
//             let commentAuthor = document.getElementById("commentAuthor");
//             let authorResponse = await fetch(`${serverUrl}/comments/${k.authorId}`);
//             let authorC = await authorResponse.json();
//             if (postId == k.postId) {
//                 commentSpan.innerHTML = ` Komentar: ${k.body}`;
//                 commentAuthor.innerHTML = `Autor komentara: ${author.name}`;
//                 // console.log(k.body + " Autor komentara: " + author.name);
//             }
//         }
//     }

// }

async function populateHtml() {
  const serverUrl = 'http://localhost:3000';
  const response = await fetch('http://localhost:3000/posts');
  const posts = await response.json();
  console.log(posts);
  let html = '';
  for (const v of posts) {
    const postTittle = document.getElementById('postTittle');
    const postAuthorId = v.authorId;
    const postId = v.id;
    const authorResponse = await fetch(`${serverUrl}/authors/${postAuthorId}`);
    const author = await authorResponse.json();
    if (postId === author.id) {
      const commentResponse = await fetch(`${serverUrl}/comments`);
      const comment = await commentResponse.json();
      html += `
      <div class="card">
      <div class="card-content">
          <div>
              <span id="postTittle">${v.title} od autora ${author.name}</span>
              <a href="#" class="secondary-content">
                  <i class="fa fa-remove"></i>
              </a>
          </div>`;
      for (const k of comment) {
        // const commentSpan = document.getElementById('commentSpan');
        // const commentAuthor = document.getElementById('commentAuthor');
        const authorResponse = await fetch(`${serverUrl}/comments/${k.authorId}`);
        const authorC = await authorResponse.json();
        if (postId === k.postId) {
          html += `
                    
                        <ul id="item-list" class="collection">
                            <li class="collection-item" id="item-${k.id}">
                                <span id="commentSpan">${k.body}</span>
                                <a href="#" class="secondary-content">
                                    <i class="fa fa-remove"></i>
                                </a>
                                <div id="commentAuthor">Autor komentara ${author.name}</div>
                            </li>
                        </ul>
                    </div>
                </div>`;
        }
      }
    }

    document.querySelector('.container').innerHTML = html;
  }
}


(async function () {
  await populateHtml();
}());
