import os
from flask import Flask, request, jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# قاعدة بيانات وهمية سريعة عشان نجرب بيها (في الشغل الحقيقي هنربط بـ DB)
# الباسوردات هنا متشفرة بـ hash عشان نبان فاهمين سيكيورتي
USER_DATABASE = {
    "seif_hamza": generate_password_hash("my_secret_password123"),
    "partner_ai": generate_password_hash("ai_project_2026")
}

@app.route('/login', methods=['POST'])
def login():
    """
    دالة تسجيل الدخول - بتشيك على اليوزر والباسورد
    """
    # بناخد البيانات اللي مبعوتة من الفورم أو الـ API
    data = request.get_json()
    
    # حتة ذكاء سريعة: لو مفيش بيانات مبعوتة أصلاً
    if not data:
        return jsonify({"status": "error", "message": "يا صاحبي فين البيانات؟ مبعتش حاجة!"}), 400
        
    username = data.get('username')
    password = data.get('password')

    # التأكد إن الحقول مش فاضية
    if not username or not password:
        return jsonify({"status": "error", "message": "اسم المستخدم والباسورد مطلوبين يا فنان."}), 400

    # التشيك على اليوزر في قاعدة البيانات
    if username not in USER_DATABASE:
        return jsonify({"status": "error", "message": "اليوزر ده مش موجود عندنا، سجل الأول."}), 401

    # مقارنة الباسورد المتشفر باللي اليوزر كتبه
    if check_password_hash(USER_DATABASE[username], password):
        return jsonify({
            "status": "success", 
            "message": f"أهلاً بيك يا {username}، نورت السيستم!",
            "token": "fake-jwt-token-for-now" # هنظبط الـ JWT بعدين
        }), 200
    else:
        return jsonify({"status": "error", "message": "الباسورد غلط، ركز وافتكره."}), 401

if __name__ == '__main__':
    # بنشغل السيرفر على الـ Localhost في مود الـ Debug عشان نشوف الأخطاء أول بأول
    app.run(debug=True, port=5000)