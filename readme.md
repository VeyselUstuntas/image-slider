# Image Slider

## Proje Hakkında
**Image Slider**, modern ve minimal bir resim kaydırıcı bileşenidir. Kullanıcıların resimleri gezinmesini sağlamak için web projelerinde kullanılabilir. Bu proje, basit ve şık bir tasarımla esnek ve özelleştirilebilir bir çözüm sunar.

## Özellikler
- Kullanıcı dostu arayüz.
- Resimlerin kolay kaydırılması.
- Duyarlı (responsive) tasarım.
- Hafif ve hızlı performans.
- Özelleştirilebilir stil ve davranış.
- **Modlar:**
  - **Slide:** Resimlerin kaydırılarak değiştiği mod.
  - **Fade:** Resimlerin yumuşak bir geçişle değiştiği mod.
- **Pan:** Resmin fareyle tutulup sürüklenmesi ve yakınlaştırılması.
- **Swipe:** Dokunmatik ekranlarda kaydırma hareketiyle resim değiştirme desteği.

## Teknolojiler
- **TypeScript**: Bileşenin dinamik ve güvenli şekilde geliştirilmesi için kullanılmıştır.
- **CSS**: Tasarım ve duyarlılık sağlanmıştır.
- **HTML**: Yapı ve içerik oluşturulmuştur.

## Kurulum
1. Bu repoyu klonlayın:
   ```bash
   git clone https://github.com/VeyselUstuntas/image-slider.git
   ```
2. Proje dizinine geçin:
   ```bash
   cd image-slider
   ```
3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

## Kullanım
1. HTML dosyanızda bir `<div>` etiketi oluşturun ve bir sınıf adı (class) tanımlayın:
   ```html
   <div class="my-slider"></div>
   ```
2. Projeyi çalıştırmak için şu komutu kullanın:
   ```bash
   npm run super
   ```
   Varsayılan tarayıcıda `http://localhost:1234` adresini ziyaret edin.
3. `app.ts` dosyasında aşağıdaki gibi sınıf adını kullanarak slider'ı başlatın:
   ```typescript
   import { Slider } from './slider';

   const slider = new Slider('.my-slider', {
     mode: 'slide', // veya 'fade'
     images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
     panEnabled: true, // Pan özelliğini etkinleştirmek için
     swipeEnabled: true // Swipe desteğini etkinleştirmek için
   });
   slider.loadImage();
   ```

## Örnek Kod
HTML dosyanıza şu kodu ekleyerek bileşeni kullanabilirsiniz:
```html
<div class="my-slider"></div>
<script src="dist/slider.js"></script>
<script>
  const slider = new ImageSlider('.my-slider', {
    images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
  });
  slider.loadImage();
</script>
```

## Katkı Sağlama
Katkılar memnuniyetle karşılanır. Değişiklik yapmak için:
1. Projeyi forklayın.
2. Yeni bir branch oluşturun:
   ```bash
   git checkout -b feature/ozellik-adi
   ```
3. Değişikliklerinizi yapın ve commit edin.
   ```bash
   git commit -m "Özellik eklendi"
   ```
4. Bir pull request gönderin.