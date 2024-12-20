const loadPortOnePayment = () => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.portone.io/v2/browser-sdk.js";
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
    })
}

const Payment = async (item) => {
    try
    {
        // PortOne 라이브러리 로드
        await loadPortOnePayment();
        const payment = await PortOne.requestPayment(item);

        if (payment.code !== undefined) {
            console.log(payment);
            console.log(payment.message);
        }

        const completeResponse = await fetch("/api/payment/complete", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
        {
                paymentId: payment.paymentId,
            }),
        });

        if (completeResponse.ok)
        {
            const paymentComplete = await completeResponse.json();
            if (paymentComplete.status === "PAID") {
                console.log(paymentComplete)
            }
            alert("결제가 완료되었습니다.");
        } else {
            console.log(await completeResponse.text());
        }
    }
    catch (error)
    {
        console.error("Error PortOne Loading Fail : " + error);
    }
}