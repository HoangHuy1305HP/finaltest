document.addEventListener('DOMContentLoaded', () => {
    const spinBtn = document.getElementById('spinBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultBoxes = document.querySelectorAll('.box div');
    const items = document.querySelectorAll('.item');
    const maxBets = 3;
    let currentBets = 0;
    let isSpinning = false;

    // Hàm khi nhấn vào nút "Quay"
    function spin() {
        if (!isSpinning) {
            isSpinning = true;
            resetBtn.disabled = true; // Vô hiệu hóa nút đặt lại
            spinBtn.disabled = true; // Vô hiệu hóa nút quay
            let spinCount = 0; // Biến đếm số lần quay
    
            // Thay đổi hình ảnh mỗi ô mỗi 100 lần
            const spinInterval = setInterval(() => {
                if (spinCount < 100) {
                    resultBoxes.forEach(box => {
                        const randomIndex = Math.floor(Math.random() * items.length);
                        const randomImage = items[randomIndex].querySelector('img').src;
                        box.innerHTML = `<img src="${randomImage}" alt="result">`;
                    });
                    spinCount++; // Tăng biến đếm sau mỗi lần quay
                } else {
                    clearInterval(spinInterval); // Dừng khi đạt đến 100 lần quay
                    isSpinning = false;
                    resetBtn.disabled = false; // Vô hiệu hóa nút đặt lại
                    spinBtn.disabled = false; // Vô hiệu hóa nút quay
                    // Lấy kết quả của ô result
                    const resultImages = Array.from(resultBoxes).map(box => box.querySelector('img').src);
                }
            }, 100);
        }
        
    }
// Thêm sự kiện click cho nút "Quay"
    spinBtn.addEventListener('click', spin);


    function placeBet(event) {
        
        const item = event.currentTarget;

        
        let currentBetCount = parseInt(item.querySelector('p').innerText);

        
        if (currentBetCount < maxBets) {
            
            currentBetCount++;

            
            item.querySelector('p').innerText = currentBetCount;

            
            currentBets++;
            if (currentBets >= maxBets) {
                
                items.forEach(item => {
                    item.style.pointerEvents = 'none';
                });
            }
        }
    }
    // Hàm check kết quả
function checkResults() {
    const selectedImage = document.querySelector('.item.selected img').getAttribute('alt');
    const resultImages = Array.from(resultBoxes).map(box => box.querySelector('img').getAttribute('alt'));

    if (resultImages.every(image => image === selectedImage)) {
        const resultString = resultImages.join(', ');
        console.log(`Bạn đã thắng: ${resultString}`);
        alert(`Bạn đã thắng: ${resultString}`);
    } else {
        console.log('Rất tiếc, bạn đã thua!');
        alert('Rất tiếc, bạn đã thua!');
    }
}
       
    
    //  hàm xử lí cho nút reset lượt chọn
     function resetBets() {
        currentBets = 0; 
        items.forEach(item => {
            item.querySelector('p').innerText = '0'; 
            item.style.pointerEvents = 'auto'; 
        });
    }
    
    items.forEach(item => {
        item.addEventListener('click', placeBet);
    });
    
   
    resetBtn.addEventListener('click', resetBets);
});
  
// hàm hover vào ảnh
function hoverPic(x) {
    x.style.height = "100px"
    x.style.width = "100px"
}
function normalPic(x) {
    x.style.height = "85px"
    x.style.width = "85px"
}
    