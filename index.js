import{a as w,S as b,i as c}from"./assets/vendor-BDaiwwc1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const L="47379272-a961c7172d29abe92af06f616",S={key:L,q:"yellow+flower"},q="https://pixabay.com/api/";async function v(s=q,o={}){try{return(await w.get(s,{params:{...S,...o}})).data}catch{throw new Error("Sorry, no results found for your query. Please try another search term.")}}function f(s){return s.map(({id:o,webformatURL:r,tags:n,likes:e,views:t,comments:l,downloads:y,largeImageURL:g})=>`
        <li data-id="${o}" class="list__item">
          <a class="gallery-link" href="${g}">                          
            <img class="item-img" src="${r}" alt="${n}"/>                  
          </a>
          <ul class="item-container-list">
              <li class="container-list">
                <h3 class="item-title">Likes</h3>
                <p class="item-content">${e}</p>
              </li>
              <li class="container-list">
                <h3 class="item-title">Views</h3>
                <p class="item-content">${t}</p>
              </li>
              <li class="container-list">
                <h3 class="item-title">Comments</h3>
                <p class="item-content">${l}</p>
              </li>
              <li class="container-list">
                <h3 class="item-title">Downloads</h3>
                <p class="item-content">${y}</p>
              </li>
            </ul>          
        </li>
    `).join("")}const P=new b(".gallery a",{captionsData:"alt",captionDelay:250}),p=document.querySelector(".form-input"),H=document.querySelector(".btn-js"),a=document.querySelector(".gallery"),i=document.querySelector(".load-more-btn");let u=1,d="",m=0;H.addEventListener("click",M);i.addEventListener("click",$);i.style.display="none";function M(s){if(s.preventDefault(),d=p.value.trim(),u=1,a.innerHTML="",i.style.display="none",!d){c.show({message:"Input cannot be empty. Please enter a search term!"});return}h()}function $(){u++,h(!0)}async function h(s=!1){const o={q:d,page:u,per_page:15};try{s?i.insertAdjacentHTML("afterend",'<span class="loader"></span>'):a.innerHTML='<span class="loader"></span>';const r=await v(void 0,o),n=document.querySelector(".loader");if(n&&n.remove(),r.hits.length===0){if(!s)throw new Error("Sorry, no results found for your query. Please try another search term.");c.show({message:"No more results to load."});return}m=r.totalHits,s?(a.insertAdjacentHTML("beforeend",f(r.hits)),E()):a.innerHTML=f(r.hits),P.refresh();const e=Math.ceil(m/o.per_page);u>=e?(i.style.display="none",c.show({message:"We're sorry, but you've reached the end of search results."})):i.style.display="block"}catch(r){c.show({message:`${r.message}`}),a.innerHTML=""}finally{p.value=""}}function E(){const{height:s}=a.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*3,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
