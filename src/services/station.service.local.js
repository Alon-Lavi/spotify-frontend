
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stationDB'

export const stationService = {
  query,
  getById,
  save,
  remove,
  getEmptyCar,
  addCarMsg,
  getRecomended
}
window.cs = stationService

var stations = [
  {

    "_id": "5cksxjas89xjsa8xjsa8jxs09",
    "name": "Daily Mix 1",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "data:image/jpeg;base64,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"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "s1001",
        "album": "album1",
        "title": "The Meters - Cissy Strut",
        "artist": "Cissy Strut",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedBy": '{minimal-user}',
        "addedAt": 162521765262
      },
      {
        "id": "mUkfiLjooxs",
          "album": "album2",
        "artist": " The JB's ",
        "title": " Pass The Peas",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedBy": {}
      },
    ],

    "isRecomended": true,
    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
  {
    "_id": "5cksxjas89xjsa8xjsa8jxs01",
    "name": "Daily Mix 2",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "data:image/jpeg;base64,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"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "s1001",
          "album": "album1",
        "title": "The Meters - Cissy Strut",
        "artist": "Cissy Strut",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedBy": '{minimal-user}',
        "addedAt": 162521765262
      },
      {
        "id": "mUkfiLjooxs",
          "album": "album2",
        "artist": " The JB's ",
        "title": " Pass The Peas",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedBy": {}
      },
    ],
    "isRecomended": true,

    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
  {
    "_id": "5cksxjas89xjsa8xjsa8jxs02",
    "name": "Daily Mix 3",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDw8PDw8PDRAPEA8PEBAPDg8QDQ8PFhYXFxYSFhYZHikhGRsmHBYWIjIiJiosLy8wGCA1OjUtOSkuLzkBCgoKDg0OGBAQGC4gICAuLi4uLi4uLi4uLi4uLi4uLC4uLi4uLC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIGAwUHBAj/xABKEAABAwIDBAYFCAUJCQAAAAABAAIDBBEFEiEGEzFBUVJhcYGRBxQiI6EyQmJykrHB0TOCsrPwNTZDU2NzdKLhFRYkJpPC0uLx/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAAzEQACAgECBAMFCAIDAAAAAAAAAQIDEQQhEjFBUQVh8BNxkbHRIjJCUoGhwfEV4RQzNP/aAAwDAQACEQMRAD8Ave7b1W+QT3Teq37IUguUbVY7U4hNPDTYhS4dT08roMslQ+KoqHt+U+zGlxZe4HLTpU2cmuDm+Z1XdN6rfshG7b1W+QXGMJnxSgzVFPXU+JwxAyVMEdaZbRNBzOLJLObwPtNF+8LsVBVsnhinjN2TRslZfQ5XAEX7dUJjsrcOuTLu29VvkEbtvVb5BQq6qOFhfK9sbBxc42Hd2nsVXrtvIWkiGF8v0nndsPcLE+YCjKcY82Sqott+4m/XfkWvdt6rfII3beq3yCow2+l500dugPffzsthR7dQOsJYpIu1pEjB9x+BVavrfUuloNTH8Ofc0/ky07tvVb5BG7b1W+QWGir4Z25oZI5RzynUd44jxXoVuzMj4k8Mju29UeQT3beqPIKSEYFlkd23qt8gnu29VvkE008BlkN23qt8gjdt6o8gpoSDLIZG9UeQQQ0ch5BTKwFNJCcmhm3Jo8gqvtztSzD4srAx1VKDumEAhg4b146ByHM+Kx7Y7bQ0IMUWWeqI0YDdkX0pCP2eJ7BquN11ZLPI+aZ5kkkN3OdxPZ2AdHJDwaKKZTfFLl8zZUm0czf0nv7kklxs8km5JPNbzDsbhmIbcxvPBr+Z7DwKpSAeY+HG6yWaWufTD9dDtVay2HXK8zpYCkAtdgNfv4gSfbb7L+09PitmAuNZFxk4s7kJqcVJdSTQpgJNCkFTJkxtCyAKLQsjQqpMY7ITsmq8gXwLiWLzT4NW1jHtqd1UymaF0NR6u17CXG5cGFxIzAWBFrHjcLtqwVtFDOzdzxRzsOuSVjXtv02PNeyayeCqs4M5WUzhVfjkmJMZSxRTTTyyNaxs+5qXsHHNHPka9nCxDswtc3C7AKiPC6CnjkdvDDDHC0DQyyNaAbdAvr2Beyjwujow98MEFMMpMj44mMOUa6kC5AXNNocWdWTukNwwezE3qs/M8T/oqrbPZrzZu09K1UuFLEY7vz8jHiuKzVUm8ldfjlYNI2DoaPx4leMKIUlz28vJ34RUUklhIEBCYCRMywSuY4PY5zHDg5pLXDxCtWE7ayss2pbvm9dtmzDv5O+CqaAnCcoPMWV26eu5Yms+ujOtYdi9PUD3UrXHqH2ZB+qdV7lxn+O1bSkx+si0bO9w6H+8H+a61R1f5kcq3wd865fo/qvodSQqDDtpVD5TIX/qPB+Dll/33n/qYf8AP+asWqrMr8K1PZfFF6TC5/JtlVO4CFncxxPxK19VjVVLo+d5HQ1xY3ybZQlrILkmy2Hg98vvNL9/ki941jtLSMc+aUDLqWM9uX7I/Gy5ntJ6Q6icGOlBpIzoX3BqXDvGjPC57V5sUbeCUfRJ/H81VJFKq9zXYsn4fXQ1n7T8/oYwNbnUkkknUkniSV6GsCwhZInA6XRIvrxkxVDADosNl66qMjVeMlWQexXdHE2bTAK7dStuTlcQCOWv+n3BX4LlzDYjlqF1GPgO4Lm+IxScX3ydHw2bcZR7E2qYCQUmrlNnTJtCyAKDQphUyYAhNCrAvaEIC9sfPSp+kHE8kTKdps6b2n/3TTw8Xfslc9W22prt/WTPvdrHbpn1WafE3PitUAubdLik2ep0dPsqYrq9372SCE0gqjYSTQE0hoLJhJSCRIAmhSCGMApBJMKJJDAUklIKIxvYCCOkEHuKos0Za8t6CR362V8CqWLMyzSd5I8dfxWnSSw5Iw6+GYxZ4pIiGg/wEoWL0l/s8eA4LHGOa18TxhmV1xUlg9LRduq8LYuLuTeIXuDlhe/Lx6b99gq4vHIvtjF4b6GAe1IzicxGnPiulR6gHjfVUPZ6n3tQCRoxpdpy5fir7GywAWPXyWYx7fyX6CLxKfd/ImAptUQsjQuWzoE2rIoNUwqGwFZCkhQyBeF5MWq9zTzS844nOH1rez8bL1qs+kCqyUgjHGWVrf1W+0fiG+a9rOXDFs8HRX7S2Me7/v8AY5wFIJJhcs9cNMJISY0SUgkEKJIaYUVIIGSTCAmEiQBSSCkFEkhhTCgFMKIyQVa2jPvBpqBa/IjkfjZb+qrI4heR7W9l7uPc0alVTFMW3zrBoawHmBnd2k8u5aNLCTlxY2MetsgocOdzxNf4+C9VObheYcVlbJYrdLyMFUsNZZnuvNWOv4LKTdKRl2nuVcdmXWZnFpHjZI5pu1zmnpaSD8Fb9m9oDIRDORn4MfoM/wBE9v3qmoVt1EbY8MjJRfOqXFH4HWQsgVP2e2mtlhqXaaBsp5dAf/5efSri1ed1FE6ZYl/Z6Cm6NseKJMKTVELIFjbLRoQhQAu6576RKvNURxDhFHc/Webn4BvmugucACSbAAkk8ABxK49i1YZ55Zj/AEj3OHY3g0eQC9hqZYjjueQ8Kr4rXP8AKv3e3yyeVSUVJYT0IgplRCkosaGiyEwkSQwmkE0DJBMJBNRJDCaSkkSRCeZsbS95s1upP4d6rtfj8j7iL3TenTeHx5eC2GO4kxjTFYSPcNQfktHSe3sVVW3S0prikvcczWaiSfBB+8bnEkkkkniSbk+KSELec0kzVZmiywNWS6hImmeprtFjqZNLDmse8WNx5qqMNy6V32cIghCFeZgV12Sxxm63M8jWOYbRl5sHM6uY6XH3KlIVOoojdDhkXUXyplxROwsIIuNQdQRwI6Vkaub7ObQupSI33fATqPnR/Sb2dI8l0eNwIBBBBAII4EHgV5rV6WdEt90+T9cju6fURujlc1zRNNJCx7mg2e3WKbmm3LT7youztEXzz48PErmq9uNYm+rndM/S+jG8mMHBv8cyV4l6e2fHLJxtHp/Y1KL5vd+//QKSiFJVGtEgmohSSY0NAQE1EkhhMJJoGNSSCaiSGFJqiFGpm3cb39VpPjbT4pYzsPOFkpdffey3NzvH6+JWBMknU6k6nvSXbSxsecby8ghCECGEwVEIRjIGQlQJSTQkDYkIQUACEIQA1cdhsZOb1SQ3FiYSeItclnda5HcexU5b/YmmL6xr7aRNe8noJGUfefJZdbCEqJ8fRZ/XoaNJKUbo8PX5HRkJoXkT0eCjhCAmvSmAYTSCkojGE0gmEhjTSCaiSQBSUQpIGSCaQTUSQwvFjlvV5Lm3C3acwNl7QtNtSDkiN9M5Fu23H4HzVlSzZEq1DxVJ+RW0IQuscEEIQgAQUIQAIQhAAhCEACEIQA1a/R88CadpOro2EDpDXG/3hVQK0bA0+aeWS/6OMNt0l5/9Ssmvx/x557GnR59tHHrYvl0k0l5M9IUoJpBNejOcSCaQTSGNMJBNIYKQUVJImgUlJsTjwa49wJSc0jiCO8WSAApKITCiSJBV3aOta8iJuu7cS53K9rZQrGFRqu+8kvxzPv35itWkgnJy7GLXTagkupiQhC6ByQQhCABCEIAEIQgAQhBQAIQgIAatfo/faaZvJ0TSe9rtP2iqpZWv0fM97O7qxsH2nX/7Vk1//nn7v5Rp0f8A3x9dC8pKSF5M9JsUgKSiE16Q5w1JRXsw3Dpal+7hYXnmeDGDpceQS5iclFNvkjzBb7CNlamos4jcRn50gOYj6LOJ8bBW3Atloaaz32nm45nD2GH6DfxOvct8tMNN1mcjUeK9Kfi/4X1K/Q7HUkdi8OqHdL3EM+y38brc09DDHpHFDH9SNrfuC9AQtUYRjyRybL7LPvybGkRfjr3oQplWEeOowqmk+XBC7t3bQ7zGq1NZsdTP1jL4T2HOzydr8VYk1XKuEuaL69TbX9yTX67fB5RzvENlKmLVoE7RzjuX27WcfK65TWX3st9CJH3HMHMV9LvOi0O0Gy9HXj38YElrNmjs2dv63MdhuFGuhQbcepql4lOxJWLl1X0/o4ChWjanYmqoM0g/4inGu9YPaYP7Rnze8XHcqurCyMlJZTBCEIJAhCEACEIQAIQkgBoQEIAas2wUtqiRvWiJ+y4fmVWVcPR/St99N84ERDsbYOJ8dPJZNc0tPPPrc1aNN3RwXNJJNeU4UeiwUsKS92GYPUVJ9zGXDm8+zEO9x/DVXnA9joYLPmtUSDUAj3DD2N+ce0+S9PCuUuRxb9ZVSvtPL7LmVrZ7ZWWptJJeGHjmI95IPoA8u0/FdCoKGKnYI4WBjR0cSelx5lehaDC9rYKitmoN3NBUQ5iWzNYGyBtr5C1xvoQ7tGq2V1RhyODqNTbqM55LouS+vvN+haKPaqB+IOw2Nk0szG5pHsDNxEAATmcXX0uBoOJAW9VhmcWuY0JhCBCQhCBAmhCAIScFBSk5KKkiD5gQuc7Z+jsPzVGHtDX6l9MLBj+kxdU/R4HlZdGUo+KbJ12Sg8xPnTFMKkpsmf5w10sWPHymHuWuXctvNkxiEeaEiOoju5t9I5ja2V/Qeh3ndcUqqeSJ74pWOjkYcr2OFnNP8c1TBSS+0dVXV2bwWPIwoCLoUiQJJpWQAIQmgAQE0WQAK9bAstBK7rTEDuDGfiSqKPPsHEldSwSj3FPFFza27vruN3fE/Bc7xOaVPD3f9nQ8Ohm3i7L5nuQhC86drBfALAAaAcAOAQhC9ofPgXPPSnhzoDBi9M4RT0r2MeeuwmzCRzsSWkcw7sXQ1pdscEdiFFJSse2IvdG7O4EgZXB3AdyGWVy4Zpv0jn0FRJhGDiuaQ+uxSRrt84B+7Y8OeDrxNrnX5z9b2XqxWrxjBvV6uqrW1sUsgjngLdGuILi1psOQdYi2oGlirViWyDKnC4MPlks+njhEczW3DZY2Zb5TxBFxbtWih2ExCokgbieIMqaWmcCyKPMXSAaAPJa3UgAEnMbEi+t0jRGyL3k1zefNdMHtw7G6h+0NVSGVxpmU7ZGRWblDjHC697X4vcePNaul2jrS7aMGdx9S3/q2jPc5ZZQLaa6NHG/BbXaLY2qkr/8AaOH1baWZ7WslztJFg0MuNCD7Ib7JHFt7rDhGwE8EWJsfVsnfiEWTeFjg4PJcS9wub3LroI5rxnK5L5oPR1Ni1WIq2qqWPpTHKxsVrSyODi3eOs23EHny4K+rU7JYQ6hooKVz2yOiDwXtBDTme5wsD9ZbZNFNklKTxyGhJCCsjIoKcnBQUkRlzBAPFCExAq1tjslDiLL6RVLBaOa3EdR/S34jlzBsqEDjJxeUfO1bg1TBK6GWJzHscG2Nsrifk5DwcDysvAQRoRYjQg6EHoX0Hj+Bw1seSS7Xt1jlZpJE7pB6Oz/6uJ7TYBU0MxbUNuHucWTNvupeeh5O6WnXvGqgzp03KxdmadCAhIuBNJNAAhCEDyb/AGNoRLUF7tWwBr7dLzfL5WJ8Ar+CqZsCfbqR9GE/GT81cQvPeJSbuafRI7vh8UqU11yZLoUboXPwbS/IQheyPnoIQuU4jDX12OV1HBiFTRsjYJWhk0wjADYgWhjXAC5fdDZOuHHnfGDq6S5rheMYjheIwUGIz+uQVOVsMxuXNc45WnMRf5VgQ69r3B6bPjW3GHUUpgmmO9bbO2ONz8l+TiNAezijJKVUspLfPYsiFSducQpqnDoJ2Yg+khknYWTwsldnOV/u3NYQ4WsTrwLRda+trpWbQ0MYmmfD6lnczM+0hEMxzFg0LjYHhxSyONTa59+nY6OktVg20lHWxSTU8ueOEkSFzXMyWbmuQ4A2tz7CsmBY3T10ZmpnOfG15ZmdG9gLgASBmAvxCZW4tZ25GxQSuJ021lVT4zM6WpqH0ja6eCRj5nugjjc97R7JNhlAuLdRWv0sY7NBDBTUz5GT1Dy8uhc5sgiZ0FpuLkjwaUZLXQ1KMe5fXG6S5TQ1bp8AElViFRTn1wg1B3s73W4Rusc2Xnx4gK8U+0VJFJS0Uk7zNLFDunyxvbvw5vsvzWy3cRw6dE0yudLXLfn07G+QtXh+P0tTPNTQPMslPfe5Y37thBtbPbKTe+l+R6Cqx6S8ZxGCGVtNA6OANjMla2UB7MzgCxgBBab2GbXie9NshGqTko8i9oWl2LnfJh1G+R7pHuhaXPe4ue466knUlbpMjJYbQLBXUcU8bopo2yxvFnMeLtP5HtWdCBHJtp/RrLFeWhJnj4mBxG/Z2NPB48j3qhSsc1xa5rmOabOa4Fr2noIOoX0stXjWz9JWi1TAyQgWD9Wyt7ntsfDgo8Jrr1TX3tz56TXT8T9FTSSaWqLR1J2B3hnbb7itBP6NsTadGwSjpZPb4OASwzUr63+Ip6Fa2ejzFD/Qxt7XTxW+BK99J6La136WanhH0TJK7ys0fFAO6tfiRrdhB72c/wBmzTpu4/db4q6NBNgBcnkNSVstl9gKekzudLJUOeGB1wI2aX4Aa8+lW2mpI4haNjGdw1PeeJXL1Ohlda5ZwtvNm6nxaumpRjFye/kvX6FJ9Qn/AKmX/pv/ACQr4hR/xcPzMj/nbPyL4sxIQhdY4ILk7sep8P2kxCepLmsdCIwWNznMWwEaDsaV1heaXDoHkufBC9x4udDG5x7yRqgsrmo5TWco5g+vdj2LUb6aKRlLQua98r220a8PN7GwzZWtA48T02w1+MZqvFoxJSYOGmVjx6m2SqrtXgj2uLnHXQfPHG111yKJrAGsa1jRwa1oa0dwCwSYZTvlbO6CF8zfkyuijMreWjyLhLBYro/l2S29M4fVH/lmn7MUd+6kVtqP5zYb/gW/uZl0T/Z8GTd7iHJfNk3UeTNa2bLa17c1J9PHmD93HvALNfkbnaOFg61wNSjASvW+3f8AfBx7bakqMOrauCk/RYwwNDBb5bpBnYO25cOjLL2LqWz2FtoqSClbY7pgDiNA+Q6vd4uJK0kmzU82MNxCofC6CCPLTRNc8yNcBo54LQOLnu0PHKrYpRRC63ijGK7b+/8A0ccpMG9ddtJEG5pGVBmh0F96yWcgDtIzN/WUdkhLiL6quqPaFDhrqaI66v3L2g35m28ce14XX4qaNhc5kbGOebvLWNa5543cRx4nzSipY2NLWRxsa6+ZrWNa119DcAaowN6nZ4XbHlssnGXfzWH+P/Nb7b90c1NhVHDGZa+RsDoMjgHxMLACSeQJA6LZCb6Lo3qMOTd7mLJfNk3TN3m6ctrX7VJtJEHB4ijDwLB4jYHgWtYOte1tEYD26znHJt/EpPokqoBTS0gZuquCV5qWu/SPJdYP8LZbciO1bL0n/wAkVfdD+9jVlZSxh5kEcYeb3eGNEhvxu61ysk0TXtLXta9p4tc0OaeeoKMbYK3YvaKfnk0Wwn8l0P8AcM/Fb9Rjja0BrWhjRoGtAa0DoAHBSUkVyeW2CEIQRBCEIAEIQgAQhCAM0PDxU1CPgFkVb5lqEhCEhmJCEKREEIQgAQhNAAsRKyrEU0KQIQhSIAhCEACAjKVLKUhiQhCAG1l0OFkNda6bRzKQyKSaExCQnZSLQQOlGQwQQhCYAhCECM0fAKahHwCmqy1AhCEYAxIQhMQIQhADQUIQALG7ihCkiMhIQhMiClHxQhMaMiRQhVljMaEIUisFk+b4IQiRJGNCEIIggIQgBIQhNACEIQIzt4DwUkIVZagQhCAP/9k="
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "s1001",
          "album": "album1",
        "title": "The Meters - Cissy Strut",
        "artist": "Cissy Strut",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedBy": '{minimal-user}',
        "addedAt": 162521765262
      },
      {
        "id": "mUkfiLjooxs",
          "album": "album2",
        "artist": " The JB's ",
        "title": " Pass The Peas",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedBy": {}
      },
    ],
    "isRecomended": true,

    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  },
  {
    "_id": "5cksxjas89xjsa8xjsa8jxs03",
    "name": "Daily Mix 4",
    "tags": [
      "Funk",
      "Happy"
    ],
    "createdBy": {
      "_id": "u101",
      "fullname": "Puki Ben David",
      "imgUrl": "data:image/jpeg;base64,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"
    },
    "likedByUsers": ['{minimal-user}', '{minimal-user}'],
    "songs": [
      {
        "id": "s1001",
          "album": "album1",
        "title": "The Meters - Cissy Strut",
        "artist": "Cissy Strut",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
        "addedBy": '{minimal-user}',
        "addedAt": 162521765262
      },
      {
        "id": "mUkfiLjooxs",
          "album": "album2",
        "artist": " The JB's ",
        "title": " Pass The Peas",
        "url": "youtube/song.mp4",
        "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
        "addedBy": {}
      },
    ],
    "isRecomended": true,

    "msgs": [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?'
      }
    ]
  }
]
createStations()
async function createStations() {
  const stationsFromStorage =await stationService.query(STORAGE_KEY)
  console.log(stationsFromStorage,'hvhjvhjvhjvhjvhjvhjjhvjh');
  if (!stationsFromStorage||!stationsFromStorage.length) {
    storageService.save(STORAGE_KEY, stations)
  }

}


async function query(filterBy = { txt: '', price: 0 }) {
  var stations = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    stations = stations.filter(station => regex.test(station.vendor) || regex.test(station.description))
  }
  if (filterBy.price) {
    stations = stations.filter(station => station.price <= filterBy.price)
  }
  return stations
}
function getRecomended() {
  const recomendedList = stations.filter(station => station.isRecomended === true)
  return recomendedList
}


function getById(stationId) {
  return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
  var savedCar
  if (station._id) {
    savedCar = await storageService.put(STORAGE_KEY, station)
  } else {
    // Later, owner is set by the backend
    station.owner = userService.getLoggedinUser()
    savedCar = await storageService.post(STORAGE_KEY, station)
  }
  return savedCar
}

async function addCarMsg(stationId, txt) {
  // Later, this is all done by the backend
  const station = await getById(stationId)
  if (!station.msgs) station.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt
  }
  station.msgs.push(msg)
  await storageService.put(STORAGE_KEY, station)

  return msg
}

function getEmptyCar() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




