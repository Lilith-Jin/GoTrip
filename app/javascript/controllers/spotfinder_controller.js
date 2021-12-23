import { Controller } from "stimulus"

export default class extends Controller {

  static targets = [ "cityinput", "keywordinput" ]

  connect() {
  }

  search(event) {

    // prevent link to redirect page
    event.preventDefault()

    const cityinput = this.cityinputTarget.value
    const keywordinput = this.keywordinputTarget.value
    const resultBox = document.querySelector(".searchResultBox")

    // 每次按下搜尋先清空搜尋結果列表
    resultBox.innerHTML = ""

    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/v1/spotfinders/search?keyword=${keywordinput}&city=${cityinput}`, {
          method: 'GET'
        })
        const result = await response.json()
        return result
      } catch {
        const result = "Empty Result"
        console.error("Something went wrong...");
        return result
      }
    };

    async function renderData() {
      
      const spotResultData = await fetchData()
      
      if (spotResultData.length === 0) {

        const noResultMessage = document.createElement("div")

        noResultMessage.classList.add("noResultMessageDiv")
        noResultMessage.innerHTML = `<p class="noResultMessage">抱歉，似乎沒有您搜尋的資料，或許可以再試一次，或者調整關鍵字讓搜尋更精準!</p>`

        resultBox.insertAdjacentElement("afterbegin", noResultMessage)

      } else {
        console.log(spotResultData);
      }

    }

    renderData()


    // 看有沒有什麼loader可以用？
    // 清除input field


  }
}
