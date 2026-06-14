/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, StorySection, CraftStep, MultilingualText } from './types';

// Import our generated images so Vite bundles them properly in production
import heroImg from './assets/images/lake_sunrise_hero_1781318900967.jpg';
import saltButterImg from './assets/images/shio_pan_salt_roll_1781319733861.jpg';
import rubyTeaImg from './assets/images/ruby_tea_shio_pan_1781319901567.jpg';
import coffeeImg from './assets/images/coffee_shio_pan_1781319919096.jpg';
import makauyImg from './assets/images/makauy_shio_pan_1781319931602.jpg';

const IMAGES = {
  hero: heroImg,
  saltButter: saltButterImg,
  rubyTea: rubyTeaImg,
  coffee: coffeeImg,
  makauy: makauyImg
};

export const PRODUCTS: Product[] = [
  {
    id: 'salt-butter',
    flavor_type: 'lake',
    price: 120,
    images: [IMAGES.saltButter],
    title: {
      zh: '湖鏡．法國鹽之花手揉鹽可頌',
      en: 'Lake Mirror Salt Butter Roll',
      ja: '湖の鏡・フランス塩之花クラシック塩パン',
      ko: '호수의 거울 · 프렌치 플뢰르 드 셀 소금빵',
      es: 'Espejo de Lago · Rollo de Mantequilla y Flor de Sal'
    },
    description: {
      zh: '將日月潭畔清晨的微波拍打，化為法國鹽之花的淡雅鹹香。外層金黃微脆，內裡Ｑ彈飽滿，頂部點綴松露級天然海鹽。',
      en: 'Capturing the morning ripples of Sun Moon Lake into a golden Japanese-style salt butter roll, topped with Fleur de Sel. Crispy bottom with a chewy, buttery core.',
      ja: '日月潭の朝のさざ波を、フランス産大粒塩の繊細な塩気に。底面はカリッと香ばしく、中はバターがじゅわっと広がるクラシック塩パン。',
      ko: '일월담의 아침 물결을 프랑스산 플뢰르 드 셀의 고급진 짠맛으로 빚었습니다. 바닥은 바삭하고 속은 고소한 버터 굴로 채워진 수제 소금빵.',
      es: 'La salinidad de la selecta flor de sal sobre un panecillo de mantequilla clásico. Suela crujiente y miga tierna inundada de mantequilla premium.'
    },
    story: {
      zh: '清晨五點的日月湖，水平如鏡。薄霧在水面緩緩流動，空氣中滿是冷冽與濕潤。我們選用頂級法國 AOP 產區發酵奶油，歷經 24 小時低溫慢速發酵，並揉入手揉鹽可頌麵團。每一口輕咬，湖鏡的寧靜伴隨著手揉麵團的麥香與海鹽的微鹹，在口中如漣漪般層層散開。',
      en: 'At 5:00 AM, Sun Moon Lake is as still as a mirror. Faint mist slow-dances on the surface. We selected French AOP Brittany butter, aged through a patient 24-hour low-temperature fermentation process, hand-rolled into a classic Japanese Shio Pan. In every crisp bite, the peaceful quietude of the lake ripples through a fragrant wave of wheat and fine sea salt.',
      ja: '早朝5時の日月潭は、まるで鏡のよう。静かに流れる薄霧、冷涼で潤う空気。フランスの最高級AOP発酵バターを使用し、24時間かけて低温でじっくり発酵。手作りの塩パンに練り込みました。ひとくち齧れば、湖の静寂がフランス産塩の花の仄かな風味と共に、何重にも広がります。',
      ko: '새벽 5시의 일월담은 거울처럼 고요합니다. 물 위로 피어오르는 안개, 차갑고 촉촉한 공기. 저희는 최고급 프랑스 AOP 발효 버터를 고집하여, 24시간 저온 슬로우 발효를 거쳤습니다. 한 입 베물면 호숫가의 정취가 버터 소금빵의 쫄깃한 식감 사이로 은은하게 피어오릅니다.',
      es: 'A las 5:00 AM, el Lago Sol y Luna descansa como un espejo. Elevamos el clásico Shio Pan con mantequilla francesa de Denominación de Origen Protegida y flor de sal de primera, aportando un centro jugoso de pura mantequilla que estalla y reverbera en el paladar.'
    },
    details: {
      ingredients: {
        zh: '精選日本小麥粉、法國 AOP 產區發酵奶油、法國鹽之花、天然海鹽。',
        en: 'Selected Japanese flour, French AOP butter, French Fleur de Sel, natural sea salt.',
        ja: '国産小麦粉、フランス産AOP発酵バター、塩の花（フルール・ド・セル）、天日塩。',
        ko: '엄선된 일본산 밀가루, 프랑스 AOP 발효 버터, 프랑스 게랑드 펄 바다꽃 소금, 천일염.',
        es: 'Harina seleccionada de trigo estilo japonés, mantequilla francesa AOP de Bretaña, flor de sal, sal marina natural.'
      },
      allergens: {
        zh: '本產品含有牛奶及麩質。',
        en: 'Contains dairy and wheat gluten.',
        ja: '乳成分、小麦を含みます。',
        ko: '밀, 우유가 함유되어 있습니다.',
        es: 'Contiene derivados lácteos y gluten de trigo.'
      },
      weight: '70g ± 5g'
    }
  },
  {
    id: 'ruby-tea',
    flavor_type: 'tea',
    price: 150,
    images: [IMAGES.rubyTea],
    title: {
      zh: '紅玉．晨曦薄霧茶鹽可頌',
      en: 'Sun-dried Ruby Tea Salt Butter Roll',
      ja: '紅玉・朝霧紅茶塩パン',
      ko: '홍옥 · 아침 안개 홍차 소금빵',
      es: 'Té Rubí · Rollo de Té de Monte y Mantequilla'
    },
    description: {
      zh: '將台茶 18 號「紅玉」茶葉深研磨入麥香，烘烤時綻放出清涼薄荷、淡淡肉桂茶香與溫熱焦香奶油完美融合的精緻鹽可頌。',
      en: 'Finely ground organic Ruby No. 18 Black Tea blended into the dough, unleashing notes of wild mint, cinnamon, and warm brown butter in a perfect salt butter roll.',
      ja: '台茶18号「紅玉」紅茶葉を贅沢に生地に練り込みました。焼き上げることでミントの清涼感とシナモンのような甘い香りが、じゅわっとした小麦と塩の風味に重なる塩パン。',
      ko: '대만 홍옥(Ruby No. 18) 홍차 찻잎을 곱게 갈아 아틀리에 도우에 온전히 녹여낸 소금빵. 버터의 고소함 속에서 민트 향과 부드러운 전설적인 티 노트가 뿜어져 나옵니다.',
      es: 'Moliendo finamente hojas de Té Negro Rubí No. 18 en la masa del panecillo de sal. Al hornearse, el calor funde la mantequilla y despierta notas de menta.'
    },
    story: {
      zh: 'Sun Moon Lake 蘊育出享譽國際的紅玉紅茶。我們在日出之前，拜訪當地的百年茶園，採集沾有露水的嫩葉。精細研磨至微米級的茶粉，揉入我們專屬的冷酵鹽奶油麵團中。烘焙時，隨著奶油在烤箱中化開，溫熱的溫度逼出紅玉茶特有的薄荷香與溫潤肉桂尾韻，在鹽可頌酥脆與Ｑ彈的質地中完美交織。這是可以食用的日月潭風土。',
      en: "Sun Moon Lake's unique microclimate produces the sublime Ruby Black Tea. Before dawn, we harvest selected dew-covered tea leaves from generational families. The micro-ground tea powder is embedded in cold-fermented dough with buttery cores. As it bakes, Ruby's characteristic cooling mint scent and honeyed cinnamon notes harmoniously blend into the savory salt-sprinkled shell.",
      ja: '世界に誇る日月潭の「紅玉（台茶18号）」紅茶。私たちは日の出前、百年の歴史を持つ茶園を訪れ、朝露をたたえた茶葉を厳選します。微粉末にした茶葉をバターたっぷりの生地に優しく練り込み。オーブンでの焼き上がりの際、熱い和風の塩パンと紅玉紅茶特有の清々しいハッカ香が交じり合います。',
      ko: '일월담의 특별한 미기후가 길러낸 명품 홍옥 홍차. 가업을 잇는 백년 다원에서 새벽이슬을 머금은 첫 찻잎을 수확하여, 마이크로 롤에 골고루 스며들게 했습니다. 프랑스산 발효 버터가 지닌 진한 풍미와 소금 기포, 홍옥 특유의 산뜻한 박하 향이 소금빵의 쫄깃한 식감 사이에서 찬란한 조화를 성사해 냈습니다.',
      es: 'Las colinas nubladas que rodean el lago nutren el majestuoso Té Negro Rubí No. 18. Cosechado a mano y plegado en nuestro suave panecillo de mantequilla. El calor del horno combina perfectamente su sabor de té con escamas de sal marina y un interior tierno y aromático.'
    },
    details: {
      ingredients: {
        zh: '特選日月潭台茶18號紅玉紅茶葉、法國 AOP 奶油、法國麵粉、天然黑糖、天然海鹽。',
        en: 'Selected Sun Moon Lake Ruby No. 18 Black Tea, French AOP butter, premium flour, unrefined brown sugar, sea salt.',
        ja: '日月潭産台茶18号紅玉紅茶葉、フランス産AOPバター、小麦粉、黒糖、天日塩。',
        ko: '엄선된 일월담 대만 18호 홍옥 찻잎, 프랑스 AOP 버터, 밀가루, 백설 사탕수수 원당, 천일염.',
        es: 'Hojas seleccionadas de té negro Rubí No. 18 de Sun Moon Lake, mantequilla francesa AOP, harina, azúcar moreno orgánico, sal marina.'
      },
      allergens: {
        zh: '本產品含有小麥麵粉、乳製品。',
        en: 'Contains wheat gluten and dairy.',
        ja: '小麦、乳成分を含みます。',
        ko: '밀, 우유 및 유제품이 포함되어 있습니다.',
        es: 'Contiene gluten de trigo y lácteos.'
      },
      weight: '75g ± 5g'
    }
  },
  {
    id: 'coffee-croissant',
    flavor_type: 'coffee',
    price: 140,
    images: [IMAGES.coffee],
    title: {
      zh: '深焙．湖畔煙草咖啡鹽可頌',
      en: 'Lakefront Deep Roast Coffee Salt Butter Roll',
      ja: '深煎り・湖畔タバコ珈琲塩パン',
      ko: '다크 로스트 · 호숫가 카카오 커피 소금빵',
      es: 'Tueste Profundo · Rollo de Mantequilla y Café'
    },
    description: {
      zh: '在日月潭多霧山林所產的火山土壤咖啡豆，中深焙火後提取香氣，揉入手揉鹽可頌，帶著成熟可可、煙燻與雪松的沉穩奢華。',
      en: 'Shade-grown coffee beans cultivated in misty lakeforests, medium-dark roasted to unlock complex notes of dark cacao, smoke, and cedarwood inside a premium salt butter roll.',
      ja: '霧深い山林の火山性土壌で育てられた希少なコーヒー豆を深煎りに。濃厚なココアやほのかなスモーキーさが、バターじゅわりの塩パンに贅沢に重なります。',
      ko: '일월담의 안개 짙은 산림 속 화산재 토양에서 수확한 원두. 바삭하고 고소한 소금빵에 다크 카카오와 산뜻한 에스프레소 아로마를 불어넣어 그윽하고 우디한 매력을 자랑합니다.',
      es: 'Granos de café de sombra cultivados en los bosques húmedos del lago, incorporados en nuestro refinado panecillo de sal con notas rústicas de cacao amargo y maderas.'
    },
    story: {
      zh: '日月潭低溫少日的獨特微氣候，減緩了咖啡漿果的熟成，令風味充滿野性的杉木與堅果香。我們將現磨的中深焙咖啡濃縮原液揉入麵團，在烘烤成鹽可頌時，黃金脆底與咖啡油脂交織，苦甜交織，如同深夜過渡至清晨的那一刻，點燃一支寧靜 of 冬日篝火。',
      en: 'The cool mist slows down the ripening of lakeside coffee cherries, accumulating dense forest pine and raw almond notes. We inject direct espresso reductions into the butter cores of our hand-kneaded salt rolls, topping them with fine sea salt. It is a harmonious bittersweet tribute to the transition from night to dawn.',
      ja: '日月潭ならではの低い気温と日照時間の短さが、コーヒーの実をゆっくりと熟成させ、野性味あふれる杉やナッツの香りを育みます。抽出したての深煎りエスプレッソをバターの層に練り込んだ大人の珈琲塩パン。ビター＆スウィートの完璧な絶妙さをお愉しみください。',
      ko: '일월담의 저온 다습한 미기후는 커피 체리의 숙성을 더디게 하여, 한층 수려한 삼나무향 야생 숲과 견과류 향을 축적시킵니다. 갓 추출한 에스프레소 액기스를 수제 소금빵 버터 포켓 마디마다 주입하였습니다. 이 쌉싸름하면서도 고소함이 응축된 달콤함은, 깊은 밤이 새벽으로 녹아드는 시간을 떠올리게 합니다.',
      es: 'La bruma persistente de las laderas ralentiza la maduración de las cerezas de café, concentrando esencias rústicas de cedro de bosque y frutos secos. Incorporamos un concentrado de café espresso de tueste profundo en el centro del hojaldre, coronado con una cobertura crujiente. Un despertar agridulce y melancólico.'
    },
    details: {
      ingredients: {
        zh: '現磨日月潭火山土壤咖啡、比利時黑巧克力、法國麵粉、法國發酵奶油、天然海鹽。',
        en: 'Lakeside micro-lot espresso, Belgian dark chocolate, French flour, French ferment butter, sea salt.',
        ja: '自家挽き日月潭珈琲、ベルギー産ダークチョコレート、小麦粉、バター、天日塩。',
        ko: '직접 그라인딩한 일월담 화산성 스페셜티 커피, 벨기에산 다크 초콜릿, 프랑스산 밀가루, 발효 버터, 천일염.',
        es: 'Café de especialidad local recién molido, chocolate belga amargo, harina enriquecida francesa, mantequilla pura, sal marina.'
      },
      allergens: {
        zh: '本產品含有牛奶及咖啡因、麩質。',
        en: 'Contains dairy, caffeine, and wheat gluten.',
        ja: '小麦、乳成分、カフェインを含みます。',
        ko: '밀, 우유, 카페인을 함유하고 있습니다.',
        es: 'Contiene derivados lácteos, cafeína y gluten de trigo.'
      },
      weight: '75g ± 5g'
    }
  },
  {
    id: 'makauy-croissant',
    flavor_type: 'mountain',
    price: 160,
    images: [IMAGES.makauy],
    title: {
      zh: '山嶺．馬告胡椒起司鹽可頌',
      en: 'Mist Mountain Makauy Wild Pepper Salt Butter Roll',
      ja: '山嶺・馬告（マーガオ）スパ味起司塩パン',
      ko: '산맥의 영혼 · 마가오 산초 치즈 소금빵',
      es: 'Cresta Silvestre · Rollo de Sal y Pimienta de Makauy'
    },
    description: {
      zh: '將台灣原住民的神聖作物——「馬告」山胡椒擊碎撒入，獨特的檸檬草、薑香與起司揉合在香Ｑ的鹽可頌中，釋放驚艷的台灣山林野產。',
      en: 'Crushed native Makauy wild mountain peppercorns paired with French cheese inside a chewy salt butter roll, releasing a legendary fusion of lemongrass, ginger, and gentle pine spice.',
      ja: '台灣原住民的傳統作物「馬告（マーガオ）」山胡椒を砕いてトッピング。フランス産チーズが塩パンの濃厚なバターと溶け合い、レモングラス、生姜、黒胡椒が織りなすアロマを放ちます。',
      ko: '대만 원주민들이 신성시하는 야생 산초 \'마가오(Makauy)\'를 정교하게 빻아 아틀리에 오븐에 올렸습니다. 프랑스산 그뤼에르 치즈와 소금빵의 진한 풍미가 어우러져 경이로운 자연의 아우라를 완성합니다.',
      es: 'La milenaria pimienta de montaña Makauy machacada y horneada sobre un tierno rollo de sal con toques de queso fundido, liberando perfumes cítricos.'
    },
    story: {
      zh: '馬告（Makauy），是泰雅族語中「充滿生機、繁衍」的意思，為台灣山林特有的野生胡椒。我們與部落小農合作，在最飽滿的雨落時節採摘。馬告本身蘊含著奇妙的檸檬、香茅與野薑味。將其融入法國起司與小麥粉中，經過手揉與低溫發酵。每一口都有溫熱的微辣與檸檬草般在口中爆發的乾淨清爽，徹底喚醒沉睡的晨間感官。',
      en: 'In Atayal indigenous tongue, "Makauy" symbolizes vitality and abundance. Known as Taiwan\'s wild mountain pepper, it carries a mysterious, complex profile of lemon, lemongrass, and warming ginger. We crush and pair it with aged French cheese within our cold-fermentation process. Striking an incredible equilibrium of savory spice and buttery clean crisp inside our artisan salt butter roll.',
      ja: '「馬告（マーガオ）」は、台湾原住民タイヤル族の言葉で「大いなる生命力、終わらぬ繁殖」を意味する、台湾を代表する野生の山胡椒です。私たちは部族の小規模農家と提携し、最も豊かな果実を手摘み。チーズと組み合わせて焼き上げられたその一葉からは、清涼なシトラスハーブ香と微かなスパイシーさが溢れ、清々しい目覚めを約束します。',
      ko: '대만 타이야족 원주민어로 "생기 가득, 마르지 않는 번창"을 뜻하는 천연 야생 산초 마가오(Makauy). 부락 농가로부터 채취한 잘 여문 야생 열매를 양질의 발효 치즈와 조합해 수제 소금빵을 빚었습니다. 노릇노릇하고 바삭한 아랫면과 촉촉한 속살을 깨물면, 가벼운 레몬그라스의 풀잎 향과 오감을 사로잡아 대만의 고산지대 숲에 서 있는 듯한 전율을 줍니다.',
      es: 'En lengua indígena Atayal, "Makauy" encarna la fuerza vital y la abundancia. Es la pimienta de montaña endémica de Taiwán, caracterizada por un aroma cítrico que evoca limoncillo, jengibre y pino silvestre. Al fusionarla con queso curado y mantequilla pura dentro de nuestro clásico rollo de sal, se obtiene una crujiente obra maestra de contrapunto salado, especiado y limpio.'
    },
    details: {
      ingredients: {
        zh: '新鮮採摘原住民馬告山胡椒、法國起司、法國麵粉、法國發酵奶油、天然海鹽。',
        en: 'Wild harvested organic Makauy, French Gruyere cheese, premium flour, French fermented butter, sea salt.',
        ja: '野生の馬告山胡椒、フランス産チーズ、小麦粉、バター、天日塩。',
        ko: '친환경 자연산 마가오 야생 산초, 프랑스산 노블 그뤼에르 치즈, 프랑스산 밀가루, 발효 버터, 천일염.',
        es: 'Pimienta salvaje Makauy cosechada a mano, queso de gruyere francés, harina, mantequilla pura, sal marina.'
      },
      allergens: {
        zh: '本產品含有牛奶乳製品、大豆及麩質。',
        en: 'Contains dairy, soy lecithin, and wheat gluten.',
        ja: '乳成分、小麦、大豆を含みます。',
        ko: '밀, 우유, 대두가 포함되어 있어 민감하신 분은 유의하시기 바랍니다.',
        es: 'Contiene derivados lácteos, soya y gluten de trigo.'
      },
      weight: '76g ± 5g'
    }
  }
];

// Poetic bundle and gift box choices
export const GIFTS = [
  {
    id: 'mist-giftbox',
    price: 1080,
    images: [IMAGES.hero], // uses the lakeside mist as a majestic visual background
    title: {
      zh: '「日月晨霧」慢焙手作禮盒',
      en: 'The Sun-Moon Morning Mist Gift Box',
      ja: '「日月晨霧」クラフトギフトボックス',
      ko: '일월진무 수제 홈스페셜 명품 기프트박스',
      es: 'Cofre de Regalo Bruma Matutina'
    },
    description: {
      zh: '包含四款經典地土風味鹽可頌（各2入），配以恆溫透氣包保鮮紙，將清晨5點的日月潭湖水、霧氣、茶園與高山氣息，完整打包寄送至您的餐桌。',
      en: 'Includes 2 of each of our 4 signature terroir salt butter rolls (8 pieces total). Shipped in state-of-the-art insulated breathable packaging to keep each crust fresh.',
      ja: '4つのシグネチャーテロワール塩パンが各2個（計8個）入っています。焼きたての香りを保つ特殊な通気性の高い保冷ギフト箱に入れてお届け。',
      ko: '지구의 영혼을 머금은 수제 소금빵 4종(각 2입, 총 8개 세트). 특수 통기성 저온 유지 럭셔리 기프트 박스 패키징으로 구워낸 바로 그 고요한 상태의 바삭함을 가정으로 안심 배송합니다.',
      es: 'Incluye 2 panecillos de sal de cada una de nuestras 4 variedades firmas (8 unidades en total). Empacado en una caja térmica transpirable especial, transportando toda la mística del lago.'
    }
  }
];

export const STORIES: StorySection[] = [
  {
    title: {
      zh: '清晨 5 點，日月潭的呼吸',
      en: '5:00 AM, The Deep Breathing of Sun Moon Lake',
      ja: '朝5時、澄みわたる湖の息吹',
      ko: '새벽 5시, 일월담의 숨결',
      es: '5:00 AM, La Respiración del Lago'
    },
    paragraphs: [
      {
        zh: '在群山合抱的日月潭，每天清晨五點，霧氣是最濃郁、最神聖的時刻。此時的湖水寂止無波，水面上漂浮著淡淡的白紗，宛若沉睡的仙子尚未甦醒。',
        en: 'At 5:00 AM amidst the sweeping mountain ridges surrounding Sun Moon Lake, the mist is at its thickest and most sacred. The deep water sits entirely motionless under a slow-drifting veil of pristine fog.',
        ja: '四方を山々に囲まれた日月潭。毎日早朝5時、湖は最も神聖で濃密な霧に包まれます。水面は一滴の波も立てずに静まり返り、漂う白いベールはまさに目覚め前の妖精のよう。',
        ko: '산맥에 둘러싸인 아시아의 푸른 심장, 일월담의 새벽 5시 안개는 자연이 보내는 일종의 성스러운 축복입니다. 물결 하나 일지 않는 고요한 호수 위로 부유하는 뽀얀 새벽안개는 마치 대지가 긴 숨을 들이쉬는 듯합니다.',
        es: 'A las 5:00 AM, entre los picos que custodian el Lago Sol y Luna, la niebla alcanza su mayor misterio y sacralidad. El agua descansa inmóvil bajo un velo fino que parece danzar al ritmo del alba.'
      },
      {
        zh: '此時，「晨霧製所」的烤爐已經緩緩升溫。我們深信，大自然的氣候是有記憶的。我們利用夜間清涼的自然空氣發酵麵團，讓湖畔的低溫、濕度與微量元素，在時間與酵母的低私語中，慢慢雕琢烘焙的靈魂。',
        en: 'Meanwhile, the artisan stone-hearth ovens of Morning Mist Atelier are preheating. We believe the local winds hold memories. We ferment our pastry dough during the cold hours of the night, allowing the precise moisture and elemental micro-particles to settle into the layers of wheat.',
        ja: 'この時、「晨霧製所」のオーブンはすでにゆっくりと温まり始めています。私たちは、自然の気候には記憶があると信じます。夜間の清涼な空気の中で低温熟成させ、湖畔の温度、湿度、長時間を掛けて発酵させて生地に味わいを与えます。',
        ko: '이때, "晨霧製所(아침 안개 아틀리에)"의 주방 오븐도 서서히 따스함을 채워나갑니다. 저희는 자연의 결은 기후의 기억을 머금는다고 굳게 믿습니다. 서늘한 밤공기 속에서 슬로우 연생 발효를 진행하여 고산 호숫가의 습도와 온도가 지닌 수려함을 빵의 연약한 숨구멍마다 천천히 수공 코팅합니다.',
        es: 'En ese mismo instante, los hornos de piedra de Morning Mist Atelier se entibian delicadamente. Creemos firmemente que el hojaldre tiene memoria. Dejamos fermentar la masa durante el frío nocturno del bosque, esculpiendo el alma de cada pieza bajo los murmullos del viento y la humedad local.'
      }
    ],
    image: IMAGES.hero
  },
  {
    title: {
      zh: '把日月潭的早晨，打包帶回你的餐桌',
      en: 'Bringing Terroir Heritage into Your Living Room',
      ja: '日月潭のテロワールを、リビングの朝食に',
      ko: '일월담의 아침을 당신의 식탁으로 배달합니다',
      es: 'El Terruño del Lago en Tu Mesa de Mañana'
    },
    paragraphs: [
      {
        zh: '我們與在地茶農、部落小農及咖啡師深度契作，將湖、茶、豆、高山融於一口。這不僅是一顆高品質的鹽可頌，更是一幅可以嚥下的水墨山水。外層極致香脆，內底細密濕潤，每一口都是東方大地與法式雅緻工藝的靈魂共鳴。',
        en: 'Collaborating directly with organic tea growers, indigenous high-mountain farmers, and micro-lot coffee roasters, we compress a mountain landscape into edible artwork. Crisp outside, tender inside: an elegant spiritual collision of East Asian terroir and heritage French laminated pastry.',
        ja: '現地の茶農家、原住民の農民、地元のバリスタと深く連携し、湖、お茶、コーヒー、そして山の自然を一滴も逃さず調和させました。これは単なる塩パンではなく、一口で味わい尽くせる「食べられる水墨画」です。',
        ko: '현지 차 명인, 고산 원주민 부족, 스페셜티 로스터들과 수년간 함께했습니다. 이는 단순한 제과 상품이 아닌, 한 번에 향유하는 수려한 수묵화 예술입니다. 프랑스 전통 밀푀유 장인 기법을 만나 매 한입마다 동양 고유의 향취와 서양 정밀 조리의 찬란한 조화를 성사해 냈습니다.',
        es: 'En estrecha labor con agricultores locales de té, caficultores de especialidad y recolectores indígenas, fundimos bosque, agua y fuego. Cada panecillo de sal es un lienzo de acuarela comestible, rindiendo tributo simultáneo al refinamiento francés y a la indómita vegetación de Taiwán.'
      }
    ]
  }
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    step: 1,
    title: {
      zh: '24小時冷發酵',
      en: '24-Hour Cold Fermentation',
      ja: '24時間低温長期熟成',
      ko: '24시간 저온 수분 에이징',
      es: 'Fermentación en Frío de 24 Horas'
    },
    description: {
      zh: '在嚴格調控的冷溫室中低溫發酵，賦與麵團柔韌卻飽含水分的彈性，誘發極致的小麥濃郁甘香。',
      en: 'Aged slow and steady in a tailored high-humidity cool room, activating subtle organic enzymes that unleash natural honey and nut wheat properties.',
      ja: '徹底した温度管理のもとでゆっくりと熟成させ、生地にしっかりとしたコシと、溢れんばかりの小麦本来の甘みを閉じ込めます。',
      ko: '초정밀 제어 슬로우 에이징 룸에서 효소 활성화를 서서히 진행하여, 밀가루 고유의 산뜻하고 고소한 단맛과 탄성이 뛰어난 빵결을 빌드합니다.',
      es: 'Maduración pausada a bajas temperaturas para desarrollar una estructura elástica óptima que potencia la dulzura intrínseca del grano de trigo.'
    },
    iconName: 'Clock'
  },
  {
    step: 2,
    title: {
      zh: '16層黃金摺疊',
      en: '16-Layer Precision Lamination',
      ja: '16層に重ねる黄金の折り込み',
      ko: '16겹 황금비 롤링과 폴딩',
      es: 'Laminado Puro de 16 Capas de Oro'
    },
    description: {
      zh: '頂級 AOP 奶油與麵皮經過 16 次幾何級數的精準摺疊，烤製後創造出迷人的中空蜂巢與多層次空氣感。',
      en: 'Premium AOP salted butter is rolled and laminated meticulously 16 geometric times to achieve the legendary golden spiral honeycomb chamber.',
      ja: '最高級のフランス産AOPバターと生地を正確に16層に折り重ね、焼き上げた際に完璧な蜂の巣状の断面と、無類のサクサク感を生み出します。',
      ko: '고급 프렌치 상온 버터와 도우를 정밀하게 16회 겹쳐, 한껏 풍성하고 정밀한 벌집 모양의 에어 포켓 레이어를 연출합니다.',
      es: 'La noble mantequilla de Normandía y la masa son laminadas geométricamente en 16 niveles para crear la perfecta cámara alveolar.'
    },
    iconName: 'ChefHat'
  },
  {
    step: 3,
    title: {
      zh: '深夜的手感揉捏',
      en: 'Midnight Artisan Shaping',
      ja: '深夜に心を込める成形',
      ko: '심야 마스터의 수제 정밀 성형',
      es: 'Moldeado Manual de Medianoche'
    },
    description: {
      zh: '在深夜凌晨時分，烘焙師的手掌溫控，小心撫平與捲出完美的新月形狀，不留一絲瑕疵。',
      en: 'Under the stillness of midnight, our master bakers manually roll each salt butter roll with zero machinery tension to ensure maximum lift.',
      ja: '真夜中、職人が1つ1つの手作業で完璧な塩パンの形へと形作っていきます。手の温度が伝わりすぎないよう迅速かつ美しく。',
      ko: '기계의 가압 없이 파티시에의 온화한 눈빛과 밤공기 속에 장인 수공으로 완벽한 소금빵 성형 구조를 정립합니다.',
      es: 'Bajo el completo silencio nocturno, nuestros panaderos modelan pacientemente cada pieza para salvaguardar la elasticidad natural sin estresar la masa.'
    },
    iconName: 'Spade'
  },
  {
    step: 4,
    title: {
      zh: '日出慢火烤製',
      en: 'Sun-Up Slow Open Hearth Baking',
      ja: '日の出とともに焼き出す',
      ko: '일출과 함께하는 슬로우 스톤 오븐 휴지',
      es: 'Horneado de Granito al Amanecer'
    },
    description: {
      zh: '清晨5點半，隨著水面晨光浮現，烤爐以細火慢烤出焦糖亮澤表面，完美鎖住各款植物地土芳馨。',
      en: 'At 5:30 AM, precisely when rays first strike Sun Moon Lake, we bake to lock in moisture, crystallizing the outer crust with a glossy shell.',
      ja: '朝5時半、最初の日差しが差し込む中、最高の温度でじっくりと焼き上げ。香ばしい香りが立ち上り、最高の一日が始まります。',
      ko: '새벽 5:30 분, 일월담의 수평선으로 첫 태양이 솟아오르면 스톤 데크 위에서 완벽한 골드 윤기를 내며 지엽적 재료 고유의 향기를 밀봉시킵니다.',
      es: 'A las 5:30 AM, justo cuando los primeros destellos iluminan el agua purísima, la cocción suave carameliza el exterior y respeta las notas silvestres.'
    },
    iconName: 'Sun'
  }
];

export const PHILOSOPHY: MultilingualText = {
  zh: '「四種土地之音，交匯於日月潭的一個清晨。」',
  en: '"Four elements of the forest, converging into a single morning at Sun Moon Lake."',
  ja: '「四つの大地が、日月潭の静かな朝に交じり合う。」',
  ko: '「대만을 담은 네 가지 자연이, 일월담의 투명한 새벽 속에서 하나로 수렴합니다.」',
  es: '「Cuatro cantos de la tierra, fundidos en un solo amanecer junto al espejo de agua.」'
};

// Global translations dictionary
export const DICTIONARY: Record<string, MultilingualText> = {
  brandName: {
    zh: '晨霧製所',
    en: 'Morning Mist Atelier',
    ja: '晨霧製所',
    ko: '晨霧製所',
    es: 'Morning Mist Atelier'
  },
  tagline: {
    zh: '「將日月潭的晨霧，打包帶回家。」',
    en: '“Bring the morning of Sun Moon Lake home.”',
    ja: '「日月潭の朝霧を、ご自宅のテーブルに。」',
    ko: '“일월담의 그윽한 아침 안개를 식탁으로 들여보세요.”',
    es: '“Llega el amanecer sagrado del lago a tu hogar.”'
  },
  exploreFlavors: {
    zh: '探索風土四境',
    en: 'Explore the 4 Terroirs',
    ja: '風土を五感で知る',
    ko: '테루아 4경 탐색',
    es: 'Explorar Sabores'
  },
  orderNow: {
    zh: '立刻預訂清晨',
    en: 'Order Dawn Delivery',
    ja: '今すぐ注文する',
    ko: '아침 신선 배송 예약',
    es: 'Pedir Ahora'
  },
  buyGiftBox: {
    zh: '預訂慢焙手作禮盒',
    en: 'Order the Handmade Gift Box',
    ja: 'ギフトボックスを贈る',
    ko: '프리미엄 기프트세트 주문',
    es: 'Comprar Cofre de Regalo'
  },
  limitWarning: {
    zh: '【每日限量 120 顆】清晨手工現焙，僅限台灣本島低溫冷藏配送。訂單額滿即關閉。',
    en: '【Strict 120 Limited Daily】Freshly baked at dawn. Delivers cold-chain throughout Taiwan. Orders close upon cap.',
    ja: '【毎日120個完全限定】早朝から職人が手作り。台湾本島全域クール冷蔵便対応。売り切れ次第終了。',
    ko: '【하루 120개 한정 생산】새벽 수제 오븐 완료 즉시, 대만 본섬 전역 콜드체인 냉장 당일 익일 특송. 조기 마감 예정.',
    es: '【Límite diario de 120 unidades】Horneado fresco al amanecer. Envío refrigerado a todo Taiwán. El cupo de reservas se cierra al agotarse.'
  },
  viewDetails: {
    zh: '細品地景細節',
    en: 'Read Edible Terroir Note',
    ja: '詳しく見る',
    ko: '지리적 정보 보기',
    es: 'Ver Detalles del Terruño'
  },
  addToCart: {
    zh: '放入採購清單',
    en: 'Add to Cart',
    ja: '買い物かごに入れる',
    ko: '바구니에 담기',
    es: 'Añadir al Carrito'
  },
  twdSymbol: {
    zh: 'NT$',
    en: 'NT$',
    ja: 'NT$',
    ko: 'NT$',
    es: 'NT$'
  },
  cartTitle: {
    zh: '清晨採購籃',
    en: 'Your Dawn Cart',
    ja: '買い物籠',
    ko: '장바구니목록',
    es: 'Carrito de Niebla'
  },
  checkoutBtn: {
    zh: '確認配送地址',
    en: 'Proceed to Dawn Delivery Details',
    ja: '配送先のご入力へ進む',
    ko: '안전 수령 정보 입력',
    es: 'Proceder a los Datos de Envío'
  },
  cartEmpty: {
    zh: '購物車目前是空的。讓日月潭的微光填滿它吧。',
    en: 'Your cart is empty. Let Sun Moon Lake’s quiet morning fill it up.',
    ja: 'かごは空です。風土が選ぶ一葉をご試食してみませんか。',
    ko: '카트가 비어있습니다. 일월담의 안개 필터로 채워보세요.',
    es: 'Tu carrito está vacío. Deja que el silencio del lago lo complete.'
  },
  storyNav: {
    zh: '晨霧故事',
    en: 'Story',
    ja: '物語',
    ko: '스토리',
    es: 'Historia'
  },
  flavorsNav: {
    zh: '風土可頌',
    en: 'Flavors',
    ja: '風味調和',
    ko: '플레이버 크로와상',
    es: 'Sabores'
  },
  philosophyNav: {
    zh: '烘焙哲學',
    en: 'Philosophy',
    ja: '哲学',
    ko: '철학',
    es: 'Filosofía'
  },
  craftNav: {
    zh: '手藝製程',
    en: 'Craft',
    ja: '技芸',
    ko: '제빵크래프트',
    es: 'El Oficio'
  },
  shopNav: {
    zh: '線上工坊',
    en: 'Shop Atelier',
    ja: '工坊ショップ',
    ko: '오프라인예약',
    es: 'Tienda'
  },
  backToTop: {
    zh: '重回晨霧之源',
    en: 'Return to Source',
    ja: '始まりに戻る',
    ko: '새벽으로 회귀',
    es: 'Volver al Inicio'
  },
  ingredientsLabel: {
    zh: '天然地土配料：',
    en: 'Full Pure Terroir Ingredients:',
    ja: '原材料名：',
    ko: '안심성분표：',
    es: 'Ingredientes Puros del Terruño:'
  },
  allergensLabel: {
    zh: '過敏原提示：',
    en: 'Allergen Information:',
    ja: 'アレルギー物質：',
    ko: '알레르기 경보：',
    es: 'Aviso de Alérgenos:'
  },
  weightLabel: {
    zh: '單顆烘焙重：',
    en: 'Average Baked Weight:',
    ja: '焼き上がり重量：',
    ko: '개당 평균 중량：',
    es: 'Peso Promedio Horneado:'
  },
  guaranteeSectionTitle: {
    zh: '晨曦安心承諾',
    en: 'Atelier Freshness & Logistics Guarantee',
    ja: '安全・安心 of 品質保証',
    ko: '아틀리에 안전 철저 배송 보장',
    es: 'Compromiso y Cuidado de Frescura'
  },
  guarantee1Title: {
    zh: '每日 5 點現烤',
    en: 'Baked Fresh Daily at 5 AM',
    ja: '毎朝5時の窯出し',
    ko: '당일 새벽 5시 窯 가마솥 수공작업',
    es: 'Frescura Genuina de las 5 AM'
  },
  guarantee1Text: {
    zh: '絕不販售過夜鹽可頌，如有溢烘均全數捐贈在地兒童之家。',
    en: 'No overnight products. Excess products are donated immediately to regional children shelters.',
    ja: '焼き残りは一切翌日に持ち越さず、地域の児童福祉施設へすべて寄付しております。',
    ko: '당일 미소진 밀가루 식음은 다음날 이월 판매하지 않으며, 전량 아동 복지 시설 등에 기부합니다.',
    es: 'Nunca vendemos pan del día anterior; los excedentes se donan a centros comunitarios locales.'
  },
  guarantee2Title: {
    zh: '黑貓低溫冷鏈',
    en: 'Taiwan Cold-Chain Logistics',
    ja: 'クロネコヤマト冷蔵空輸',
    ko: '야마토 콜드체인 급랭 배송',
    es: 'Logística de Frío Garantizada'
  },
  guarantee2Text: {
    zh: '採用黑貓探溫冷藏配送，完美維持高水合度蜂窩層不崩塌，鎖住鹽可頌精油香。',
    en: 'Shipped via top-tier climate monitored cold vans to prevent the delicate multi-structured pastry honeycomb from collapsing.',
    ja: 'ヤマト運輸と提携し、冷蔵温度を全区間で記録。緻密な空気層を潰さず、塩パンの香りを完全維持。',
    ko: '이슬 맺힌 버터 세포층의 함몰을 영구 방지하기 위해, 항온 제어 특송 시스템을 가동합니다.',
    es: 'Transporte bajo control estricto de temperatura, asegurando que la arquitectura de capas no sufra desperfecto o pérdida de aromas.'
  },
  checkoutTitle: {
    zh: '預訂晨曦物流資料',
    en: 'Dawn Shipping Information',
    ja: 'お届け先のご情報',
    ko: '신선 배송지 정보 입력',
    es: 'Datos de Despacho y Envío'
  },
  fullName: {
    zh: '收件人姓名',
    en: 'Receiver Full Name',
    ja: 'お名前（フルネーム）',
    ko: '수령인 성명',
    es: 'Nombre Completo del Destinatario'
  },
  phone: {
    zh: '收件人聯絡電話',
    en: 'Contact Phone Number',
    ja: 'お電話番号',
    ko: '전화번호',
    es: 'Teléfono de Contacto'
  },
  address: {
    zh: '配送地址（限台灣本島）',
    en: 'Shipping Address (Taiwan Island Only)',
    ja: 'ご住所（台湾本島限定）',
    ko: '배송 주소 (대만 본도 한정)',
    es: 'Dirección de Entrega (Exclusivo Taiwán)'
  },
  deliveryDate: {
    zh: '希望送達日期',
    en: 'Preferred Delivery Date',
    ja: 'お届けご希望日',
    ko: '희망 배송 예정일',
    es: 'Fecha Preferida de Entrega'
  },
  deliveryTimeSlot: {
    zh: '希望收件時段',
    en: 'Preferred Delivery Window',
    ja: 'お届け時間帯',
    ko: '희망 수령 시간대',
    es: 'Rango Horario de Entrega'
  },
  timeMorning: {
    zh: '清晨與上午 (08:00 - 13:00)',
    en: 'Morning Fog (08:00 - 13:00)',
    ja: '朝霧の時間帯 (08:00 - 13:00)',
    ko: '오전 일찍 (08:00 - 13:00)',
    es: 'Bruma Matutina (08:00 - 13:00)'
  },
  timeAfternoon: {
    zh: '午後涼風 (14:00 - 18:00)',
    en: 'Afternoon Breath (14:00 - 18:00)',
    ja: '涼風おやつの時間 (14:00 - 18:00)',
    ko: '오후 느지막이 (14:00 - 18:00)',
    es: 'Tarde Fresca (14:00 - 18:00)'
  },
  submitOrder: {
    zh: '確認無誤，送出訂單',
    en: 'Complete Artisanal Order',
    ja: '注文を確定し薄霧を迎える',
    ko: '신선 새벽 배송 예약 접수',
    es: 'Confirmar y Enviar Pedido'
  },
  orderSuccessTitle: {
    zh: '預訂成功，靜待晨霧飄落',
    en: 'Order Received. Let the Morning Fog drift in.',
    ja: 'ご注文完了。朝霧を静かにお待ちください。',
    ko: '소중한 새벽 주문이 정상 접수되었습니다.',
    es: 'Pedido Confirmado. Deja que la bruma comience a flotar.'
  },
  orderSuccessMsg: {
    zh: '感謝您預訂日月潭的晨霧地景。我們的烘焙團隊將於凌晨5點點燃烤爐，為您客製專屬的手揉鹽可頌。配送詳細資訊已彙整並通知物流團隊。',
    en: 'Thank you for bringing Sun Moon Lake home. Our master bakers will ignite the stone hearth at 5:00 AM sharp to craft your salt butter rolls. A delivery status link will follow.',
    ja: '日月潭の大自然を愛していただき誠にありがとうございます。職人チームは早朝5時より丁寧に薪窯を点火し烘焙を手作業で行います。追跡情報を別途ご案内いたします。',
    ko: '일월담의 대자연을 예약해 주셔서 머리 숙여 감사드립니다. 저희 마스터 팀은 새벽 5시 정각에 불을 올려 정성스럽게 수제 소금빵을 굽겠습니다. 택배번호는 별도 발송됩니다.',
    es: 'Gracias por llevarte el terruño del Lago Sol y Luna a casa. Nuestro taller encenderá los hornos a las 5:00 AM en punto para confeccionar el lote de tus panes de sal. Pronto recibirás un correo de seguimiento.'
  },
  closeBtn: {
    zh: '返回工坊',
    en: 'Return to Gallery',
    ja: '戻る',
    ko: '메인화면',
    es: 'Volver al Taller'
  },
  qtyLabel: {
    zh: '數量：',
    en: 'Quantity:',
    ja: '数量：',
    ko: '수량：',
    es: 'Cantidad:'
  },
  totalLabel: {
    zh: '總計額：',
    en: 'Total Amount:',
    ja: '合計金額：',
    ko: '총 결제 금액：',
    es: 'Monto Total:'
  },
  freeShippingLabel: {
    zh: '【限定】全品項享冷鏈配送，滿 NT$1,500 免運費（未達收 NT$160 低溫運費）。',
    en: '【Promo】Free cold-chain shipping for orders above NT$1,500 (Otherwise flat rate NT$160).',
    ja: '【期間限定】お買い物合計金額 1,500元以上で配送料無料。未満は一律160元のクール便送料。',
    ko: '【한정】총액 NT$1,500 이상 구매 시 무료 배송 보장 (NT$1,500 미만 주문 시 NT$160 부과)',
    es: '【Cuidado】Envío refrigerado gratis en compras superiores a NT$1,500 (De lo contrario, tarifa básica NT$160).'
  },
  shippingFee: {
    zh: '冷藏物流費：',
    en: 'Cold-chain Freight:',
    ja: 'クール便配送料：',
    ko: '콜드체인 배송비：',
    es: 'Logística de Frío:'
  },
  freeShippingApplied: {
    zh: '已達免運門檻',
    en: 'Free Shipping Unlocked',
    ja: '送料無料適用中',
    ko: '무료배송 혜택 적용',
    es: 'Envío Gratis Aplicado'
  },
  footerDisclaimer: {
    zh: '晨霧製所 © 2026 || 原創手感烘焙，嚴選台灣日月潭在地風土滋味。與泰雅族、邵族小農共榮契作。',
    en: 'Morning Mist Atelier © 2026 || Artisanal lamination inspired by Sun Moon Lake terroirs. Collaborative farming with native Atayal & Thao communities.',
    ja: '晨霧製所 © 2026 || 日月潭の自然に帰依する塩パン専門工坊。タイヤル族、サオ族支援。',
    ko: '晨霧製所 © 2026 || 대만 일월담의 영혼을 직화 굽기 하는 파티세리 소금빵 전문점. 아타얄 및 타오 부족과 공정 기여.',
    es: 'Morning Mist Atelier © 2026 || Repostería artesanal de sal conectada al terruño del Lago Sol y Luna. En alianza con productores indígenas Atayal y Thao.'
  }
};
