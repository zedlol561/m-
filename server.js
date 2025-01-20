const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3001; // يمكنك تغيير المنفذ إذا لزم الأمر

// Middleware للتعامل مع JSON
app.use(express.json());

// تعريف route لإرسال الطلبات إلى API
app.post('/api/order', async (req, res) => {
    const { videoUrl, quantity } = req.body;

    if (!videoUrl || !quantity) {
        return res.status(400).json({ error: 'الرجاء إدخال رابط الفيديو وعدد المشاهدات' });
    }

    try {
        const apiKey = 'e9bfbf1a7f721e35cbd6b80f363fa10f'; // مفتاح API الخاص بك
        const serviceId = 7582; // رقم الخدمة (رقم خدمة رشق مشاهدات تيك توك)

        const response = await fetch('https://abdocenter.com/api/v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                key: apiKey,
                action: 'add',
                service: serviceId,
                link: videoUrl,
                quantity: quantity
            }).toString()
        });

        if (!response.ok) {
            throw new Error(`فشل في جلب البيانات: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('حدث خطأ:', error);
        res.status(500).json({ error: 'حدث خطأ أثناء معالجة الطلب' });
    }
});

// تشغيل الخادم
app.listen(port, () => {
    console.log(`الخادم الوسيط يعمل على http://localhost:${port}`);
});