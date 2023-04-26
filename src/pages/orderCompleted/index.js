// 동균님 코드
// function displayOrderInfo(data) {
//   const orderHistory = data[0].orderHistory;

//   // 주문 정보 표시
//   const orderNumber = document.getElementById("orderNumber");
//   orderNumber.innerText = orderHistory[0].orderNumber;

//   const orderDate = document.getElementById("orderDate");
//   orderDate.innerText = orderHistory[0].orderDate;

//   const totalPayment = document.getElementById("totalPayment");
//   const totalPrice = orderHistory.reduce((total, order) => total + order.price, 0);
//   totalPayment.innerText = totalPrice.toLocaleString() + "원";

//   // 상품 정보 표시
//   const productList = document.getElementById("productList");
//   const productUl = productList.getElementsByTagName("ul")[0];

//   for (let order of orderHistory) {
//     const productLi = document.createElement("li");
//     productLi.innerText = `${order.product}: ${order.price.toLocaleString()}원`;
//     productUl.appendChild(productLi);
//   }
// }

// fetch("http://localhost:3000/member")
//   .then((response) => response.json())
//   .then((data) => displayOrderInfo(data))
//   .catch((error) => console.error(error));

// DOMContentLoaded 이벤트 발생 시 실행되는 함수
document.addEventListener("DOMContentLoaded", function () {
  const orderId = "64458af4b890a33b60d299f3"; // 주문 조회할 ID
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ3YTYwYmZiZjM1MThmMzMyMGIzZDEiLCJpYXQiOjE2ODI0MTcxOTh9.TWD4PDEDKMlEeAA0HZKJY4BFH8OBgU3Gy-3x3A4v_AE"; // 사용자 토큰

  // fetch 함수 실행
  fetch(`http://localhost:5500/api/v1/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (!result || !result[0]) {
        console.log("주문 정보를 가져올 수 없습니다.");
        return;
      }

      const order = result[0]; // API에서 가져온 첫 번째 주문 정보 사용

      // 주문번호 표시
      const orderNumberElem = document.querySelector("#orderNumber");
      if (orderNumberElem) {
        orderNumberElem.innerHTML = order._id;
      }

      // 주문일시 표시
      const orderDateElem = document.querySelector("#orderDate");
      if (orderDateElem) {
        orderDateElem.innerHTML = new Date(order.createdAt).toLocaleString();
      }

      // 상품정보 및 결제금액 표시
      const itemsContainer = document.querySelector("#productList ul");
      let totalPrice = 0;

      order.orderItems.forEach((item) => {
        const totalItemPrice = item.price * item.quantity;
        totalPrice += totalItemPrice;

        const itemHtml = `
          <li>
            <span>${item.productId}</span>
            <span>${item.quantity}개</span>
            <span>${addComma(totalItemPrice)}원</span>
          </li>`;
        itemsContainer.insertAdjacentHTML("beforeend", itemHtml);
      });

      // 총 결제금액 표시
      const totalPriceElem = document.querySelector("#totalPayment");
      if (totalPriceElem) {
        totalPriceElem.innerHTML = `${addComma(totalPrice + 3000)}원`;
      }
    })
    .catch((error) => console.log("error", error));
});

// 가격에 ,(쉼표) 삽입하는 함수
function addComma(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
