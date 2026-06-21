if (!localStorage.getItem('user_seif_hamza')) {
    localStorage.setItem('user_seif_hamza', '123456');
}

function switchTab(type) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.getElementById('messageBox').style.display = 'none';

    if (type === 'signin') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('signInForm').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('signUpForm').classList.add('active');
    }
}

document.getElementById('signInForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('login_username').value;
    const pass = document.getElementById('login_password').value;
    const btn = this.querySelector('.btn-submit');
    const msg = document.getElementById('messageBox');

    btn.disabled = true;
    btn.innerText = 'Verifying...';
    msg.style.display = 'none';

    setTimeout(() => {
        msg.style.display = 'block';
        const savedPassword = localStorage.getItem(`user_${user}`);

        if (savedPassword && savedPassword === pass) {
            btn.innerText = 'Access Granted';
            btn.style.background = '#10b981';
            msg.style.background = 'rgba(16, 185, 129, 0.2)';
            msg.style.color = '#10b981';
            msg.innerText = `Welcome back, ${user}!`;
            localStorage.setItem('last_logged_user', user);
        } else {
            btn.disabled = false;
            btn.innerText = 'Sign In';
            msg.style.background = 'rgba(239, 68, 68, 0.2)';
            msg.style.color = '#ef4444';
            msg.innerText = 'Account not found or wrong password.';
        }
    }, 800);
});

document.getElementById('signUpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('reg_username').value;
    const pass = document.getElementById('reg_password').value;
    const btn = this.querySelector('.btn-submit');
    const msg = document.getElementById('messageBox');

    btn.disabled = true;
    btn.innerText = 'Creating Identity...';
    msg.style.display = 'none';

    setTimeout(() => {
        msg.style.display = 'block';

        if (localStorage.getItem(`user_${user}`)) {
            btn.disabled = false;
            btn.innerText = 'Create Account';
            msg.style.background = 'rgba(239, 68, 68, 0.2)';
            msg.style.color = '#ef4444';
            msg.innerText = 'This username is already taken.';
        } else {
            localStorage.setItem(`user_${user}`, pass);
            btn.innerText = 'Account Created!';
            btn.style.background = '#10b981';
            msg.style.background = 'rgba(16, 185, 129, 0.2)';
            msg.style.color = '#10b981';
            msg.innerText = 'Success! You can now switch to Sign In tab to enter.';
            document.getElementById('reg_username').value = '';
            document.getElementById('reg_password').value = '';
            btn.disabled = false;
        }
    }, 1000);
});

window.addEventListener('DOMContentLoaded', () => {
    const lastUser = localStorage.getItem('last_logged_user');
    if (lastUser) {
        document.getElementById('login_username').value = lastUser;
        document.getElementById('login_password').value = localStorage.getItem(`user_${lastUser}`) || '';
    }
});