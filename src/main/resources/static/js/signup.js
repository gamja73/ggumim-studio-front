// 비밀번호 규칙 ( 숫자 + 문자 + 특수문자 - [~!@#$%^&] 1자씩 포함한 8~24자의 문자열 )
const passwordRegExp =/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&])[a-zA-Z\d~!@#$%^&]{8,24}$/;

const signup = async () => {
    const id = document.getElementById("signupModalId");
    const password = document.getElementById("signupModalPassword");
    const passwordCheck = document.getElementById("signupModalPasswordCheck");
    const name = document.getElementById("signupModalName");
    const callPhone = document.getElementById("signupModalCallPhone");
    const email = document.getElementById("signupModalEmail");
    const nickname = document.getElementById('signupModalNickname');
    const address = document.getElementById("signupModalAddress");
    const addressDetail = document.getElementById("signupModalAddressDetail");

    if (id.value == null || id.value.length <= 0)
    {
        alert("아이디를 입력해주세요.");
        return;
    }

    if (password.value == null || password.value.length <= 0)
    {
        alert("비밀번호를 입력해주세요.");
        return;
    }

    if (passwordRegExp.test(password.value))
    {
        alert("비밀번호는 숫자와 문자, 특수문자의 조합으로 만들어져야 합니다.");
        return;
    }

    if (passwordCheck.value == null || passwordCheck.value.length <= 0)
    {
        alert("비밀번호를 한번더 입력해주세요.");
        return;
    }

    if (password.value !== passwordCheck.value)
    {
        alert("비밀번호가 일치하지 않습니다.");
        return
    }

    if (name.value == null || name.value.length <= 0)
    {
        alert("이름을 입력해주세요.");
        return;
    }

    if (callPhone.value == null || callPhone.value.length <= 0)
    {
        alert("휴대폰 번호를 입력해주세요.");
        return;
    }

    if (isValidPhoneNumber(callPhone.value))
    {
        alert("전화번호 형식으로 입력해주세요. ex) 010-1234-1234")
        return;
    }

    if (email.value == null || email.value.length <= 0)
    {
        alert("이메일을 입력해주세요.");
        return;
    }

    if (isValidEmail(email.value))
    {
        alert("이메일 형식으로 입력해주세요.");
        return;
    }

    if (nickname.value == null || nickname.value.length <= 0)
    {
        alert("닉네임을 입력해주세요.");
        return;
    }

    if (address.value == null || address.value.length <= 0)
    {
        alert("주소를 입력해주세요.");
    }

    const json = {
        id: id.value,
        password: SHA256(password.value),
        name: name.value,
        callPhone: callPhone.value,
        email: email.value,
        nickname: nickname.value,
        address: address.value,
        addressDetail: addressDetail.value,
    }

    await apiRequest(
        HttpMethod.POST,
        AUTH_URL + "/signup",
        json,
        (res) => {
            alert("회원가입이 완료되었습니다.");
            location.reload();
        },
        (err) => {
            alert(err);
        }
    )
}