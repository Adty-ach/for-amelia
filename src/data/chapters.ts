/**
 * chapters.ts — The Story
 * ---------------------------------
 * Setiap chapter novel interaktif didefinisikan di sini sebagai satu entry,
 * berisi beberapa "page" (scene). Menambah chapter atau page baru = ubah
 * array di bawah, tanpa menyentuh komponen reading engine sama sekali.
 *
 * CONTENT REVISION: isi Prolog, Bab I, Bab II, dan Bab III di bawah ini
 * diadaptasi LANGSUNG dari naskah novel yang ditulis sendiri oleh
 * pemilik proyek — naskah tersebut adalah canon utama. Prosa TIDAK
 * ditulis ulang; hanya dipecah/digabung menjadi page untuk kebutuhan
 * pacing membaca di web. Satu-satunya penyesuaian minor adalah
 * mengoreksi beberapa salah ketik mekanis di naskah asli (mis. "jugs"
 * -> "juga", huruf kapital nyasar di tengah kalimat) — tidak ada kata,
 * kalimat, fakta, atau dialog yang diubah maknanya.
 *
 * Chapter dengan status "placeholder" sengaja belum punya isi — akan
 * ditulis bertahap sesuai naskah yang sudah tersedia namun belum
 * diadaptasi dalam tahap ini.
 */

export type StoryChatMessage = {
  from: "adit" | "amelia";
  text: string;
};

export type StoryPage =
  | { id: string; type: "narrative"; content: string[] }
  | { id: string; type: "quote"; content: string; attribution?: string }
  | { id: string; type: "chat"; messages: StoryChatMessage[] }
  | { id: string; type: "image"; caption?: string }
  | { id: string; type: "divider"; label?: string }
  | {
      id: string;
      type: "turning-point";
      message: StoryChatMessage;
      narrativeAfter: string[];
    };

export interface Chapter {
  id: string;
  order: number;
  title: string;
  subtitle?: string;
  /** "placeholder" = judul sudah ditentukan, isinya menyusul. */
  status: "available" | "placeholder";
  pages: StoryPage[];
}

export const chapters: Chapter[] = [
  {
    id: "prologue",
    order: 0,
    title: "Prolog",
    subtitle: "Sebelum Cerita Itu Dimulai",
    status: "available",
    pages: [
      {
        id: "prologue-1",
        type: "narrative",
        content: [
          "Aku tidak tahu kapan tepatnya sebuah cerita dimulai. Mungkin ketika dua orang pertama kali saling mengikuti di Instagram. Mungkin ketika sebuah nama muncul di daftar followers, lalu beberapa hari kemudian tetap ada di sana sampai akhirnya terasa biasa. Atau mungkin sebenarnya tidak ada yang istimewa dari awalnya. Tidak ada musik latar. Tidak ada adegan dramatis. Tidak ada sesuatu yang membuat seseorang berhenti dan berkata, Nah. Di sinilah semuanya dimulai. Hanya sebuah Instagram Story. Sebuah permintaan sederhana. Rekomendasi novel. Aku membalasnya seperti seseorang yang membalas banyak hal lain di internet. Tidak dengan pikiran bahwa percakapan itu akan menjadi penting. Tidak dengan dugaan bahwa suatu hari nanti aku akan mengingat detail-detail kecil dari percakapan tersebut. Aku bahkan tidak tahu waktu itu bahwa aku akan membaca sebuah novel karena seseorang merekomendasikannya kepadaku. Aku juga tidak tahu bahwa nama sebuah novel akan terus muncul dalam ingatanku bukan hanya karena isinya. Melainkan karena orang yang merekomendasikannya.",
          "Namanya Amelia. Awalnya, kami hanya mutual Instagram. Sangat sederhana, aku sempat mengira mungkin kami akan menjadi calon teman sekampus. Aku akan kuliah di President University, dan entah kenapa aku mengira kemungkinan itu ada. Ternyata tidak. Kami tidak akan menjadi teman sekampus. Karena ternyata dia masih duduk di bangku SMA. Kami bahkan tidak tinggal di tempat yang sama. Tetapi mungkin ada beberapa pertemuan yang memang tidak membutuhkan tempat yang sama. Kadang-kadang cukup sebuah layar. Sebuah notifikasi. Seseorang yang sedang punya waktu. Dan seseorang yang kebetulan membalas. Percakapan pertama kami tidak membahas masa depan. Tidak membahas kehidupan. Tidak membahas hal-hal besar. Kami hanya membicarakan buku. Dia meminta rekomendasi novel. Aku membalas. Dia memberikan beberapa rekomendasi balik dan salah satunya adalah Laut Bercerita.",
          "Lalu percakapan selesai.",
        ],
      },
      {
        id: "prologue-2",
        type: "narrative",
        content: [
          "Setidaknya, begitulah kelihatannya. Keesokan harinya, dia membuat Story lagi. Tentang kuesioner. Aku mengisinya. Aku pikir setelah itu selesai. Ternyata justru dari sebuah kuesioner muncul sebuah pertanyaan yang sampai sekarang masih kuingat persis. \u201CKupanggil kakak atau nama aja?\u201D Aku tidak tahu kenapa pertanyaan sesederhana itu terasa seperti sebuah pintu. Mungkin karena setelah pertanyaan tersebut, percakapan tidak benar-benar berhenti lagi. Atau mungkin karena manusia memang punya kebiasaan aneh dalam memberikan arti pada kejadian-kejadian kecil setelah semuanya sudah terjadi.",
          "Ketika sesuatu telah berkembang menjadi bagian penting dari hidup, kita sering menoleh ke belakang dan mencari titik awalnya. Seolah-olah kita harus menemukan satu detik yang bisa diberi tanda. Semuanya dimulai di sini. Padahal mungkin tidak begitu. Mungkin sebuah cerita tidak pernah benar-benar dimulai dari satu titik. Mungkin ia tumbuh dari banyak hal kecil yang awalnya terlihat tidak penting. Sebuah follow. Sebuah Story. Sebuah novel. Sebuah kuesioner. Sebuah pertanyaan tentang bagaimana seseorang ingin dipanggil. Dan setelah itu, entah bagaimana, dua orang yang awalnya tidak saling mengenal mulai saling tahu sedikit demi sedikit. Tentang sekolah. Tentang masa depan. Tentang mimpi yang aneh. Tentang hari yang buruk. Tentang hal-hal kecil yang biasanya dilupakan. Tentang sesuatu yang membuat salah satu dari mereka tertawa. Tentang sesuatu yang membuat salah satu dari mereka lelah. Tentang siapa yang sedang sibuk. Tentang siapa yang sedang belajar. Tentang siapa yang kadang hanya ingin didengar. Aku masih tidak tahu kapan cerita ini benar-benar dimulai. Tapi aku tahu satu hal. Semuanya memang terasa sederhana. Dan mungkin justru karena itu, semuanya menjadi mudah diingat.",
        ],
      },
    ],
  },
  {
    id: "chapter-1",
    order: 1,
    title: "Mutual",
    status: "available",
    pages: [
      {
        id: "chapter-1-1",
        type: "narrative",
        content: [
          "Awalnya, Amelia hanyalah satu nama di Instagram. Tidak lebih. Seseorang yang muncul di antara banyak nama lain yang ada di daftar followers dan following. Selesai. Tidak ada percakapan panjang. Tidak ada obrolan malam sampai lupa waktu. Bahkan mungkin kalau waktu itu ada yang bertanya tentang Amelia, aku tidak akan bisa menjawab banyak. Aku hanya tahu dia ada. Dan aku tahu sedikit tentang dirinya dari apa yang muncul di Instagram.",
          "Begitulah cara kita mengenal orang-orang sekarang. Bukan dengan duduk di tempat yang sama selama bertahun-tahun. Bukan dengan bertemu setiap hari. Tetapi lewat potongan-potongan kecil yang mereka pilih untuk ditampilkan. Sebuah foto. Sebuah Story. Sebuah lagu. Sebuah buku. Hal-hal kecil yang kadang terasa sepele, tetapi perlahan membentuk gambaran tentang seseorang. Aku tidak tahu apakah Amelia sadar bahwa aku memperhatikannya. Kemungkinan besar tidak, atau mungkin iya. Aku pun tidak merasa sedang melakukan sesuatu yang istimewa. Hanya saja, ada rasa penasaran kecil.",
          "Awalnya aku mengira mungkin dia akan menjadi calon teman sekampus. Aku akan kuliah di President University, dan pikiranku waktu itu masih penuh dengan berbagai kemungkinan tentang kehidupan kampus. Aku belum tahu seperti apa teman-temanku nanti. Belum tahu siapa yang akan dekat denganku. Belum tahu kehidupan seperti apa yang akan kujalani setelah sekolah selesai. Jadi ketika ada seseorang yang terasa mungkin memiliki jalur yang sama, otak memang langsung membuat asumsi sendiri. Mungkin nanti ketemu. Mungkin nanti kenal. Mungkin nanti jadi teman.",
          "Ternyata Amelia bukan calon teman sekampusku. Dan lucunya, kemungkinan itu justru terasa semakin tidak penting setelah kami mulai berbicara. Karena ternyata seseorang tidak harus berada di tempat yang sama untuk mulai mengisi sebagian dari harimu.",
          "Hari itu Amelia membuat sebuah Instagram Story. Tentang novel. Dia meminta rekomendasi. Aku melihatnya dan berhenti sedikit lebih lama dari biasanya. Aku suka buku. Aku punya beberapa judul yang langsung muncul di kepala. Jadi aku membalas. Tidak ada pertimbangan panjang. Tidak ada strategi. Aku hanya memberikan rekomendasi. Kemudian aku meminta rekomendasi balik. Amelia mengirim beberapa judul. Di antara daftar itu ada satu nama yang kemudian justru tinggal paling lama di kepalaku. Laut Bercerita. Aku belum membacanya. Tapi judul itu kusimpan. Percakapan kami selesai seperti percakapan-percakapan lain. Aku tidak memikirkan apa-apa lagi.",
        ],
      },
      {
        id: "chapter-1-2",
        type: "narrative",
        content: [
          "Setidaknya sampai keesokan harinya. Keesokan harinya Amelia membuat Story tentang kuesioner. Dia sedang membutuhkan orang untuk mengisinya. Aku membantu. Selesai. Dan sekali lagi, dalam pikiranku, selesai berarti selesai. Ternyata manusia memang terlalu suka berpikir bahwa setiap percakapan harus punya titik berhenti yang jelas.",
        ],
      },
      {
        id: "chapter-1-turning-point",
        type: "turning-point",
        message: { from: "amelia", text: "Kupanggil kakak atau nama aja?" },
        narrativeAfter: ["Aku menatap pertanyaan itu.", "Lucu.", "Kalimatnya pendek sekali."],
      },
      {
        id: "chapter-1-3",
        type: "narrative",
        content: [
          "Tetapi sejak pertanyaan itu muncul, percakapan kami mulai terasa berbeda. Lebih lepas. Lebih panjang. Lebih mudah berkembang. Satu pertanyaan melahirkan pertanyaan lain. Satu topik membawa topik berikutnya. Sekolah mulai masuk. Lalu kegiatan. Lalu hal random. Lalu cerita tentang hal-hal yang sebenarnya tidak pernah ada di rencana percakapan.",
          "Amelia ternyata tipe orang yang ketika sudah nyaman bercerita, ceritanya tidak berhenti dalam satu bubble. Ada satu pesan. Lalu satu lagi. Lalu satu lagi. Kata-katanya sering dipanjangkan. Beberapa kalimat terasa seperti ditulis sambil tertawa. Kadang ada emoji. Kadang ada pertanyaan balik. Dan yang paling terasa adalah dia tidak hanya menjawab. Dia membuka topik baru. Percakapan yang seharusnya selesai jadi punya alasan untuk berlanjut. Dan yap, aku suka hal itu. Aku mulai menikmati pola itu.",
          "Tetapi dari awal sudah ada satu hal yang juga harus kupelajari. Amelia kadang lambat membalas. Beberapa jam. Kadang lebih. Dan aku tahu diriku sendiri. Aku bisa terlalu banyak berpikir. Satu pesan yang belum dibalas bisa menghasilkan terlalu banyak kemungkinan di kepala. Mungkin sibuk. Mungkin capek. Mungkin tidak tahu harus jawab apa. Mungkin aku terlalu banyak chat. Skenario terburuknya mungkin... dia ga nyaman?",
        ],
      },
      {
        id: "chapter-1-4",
        type: "narrative",
        content: [
          "Aku pernah melewati fase ketika otak terasa seperti mesin pembuat skenario yang tidak pernah diminta bekerja. Padahal mungkin kenyataannya sederhana. Dia hanya sedang menjalani hidupnya. Dia sekolah. Belajar. Punya keluarga. Punya kegiatan. Dan aku mulai paham hal itu. Karena kedekatan bukan berarti seseorang harus selalu tersedia. Ada perbedaan antara seseorang tidak membalas karena tidak ingin bicara, dan seseorang yang memang sedang hidup di luar layar. Dan aku belum selalu pandai membedakannya.",
          "Tapi perlahan, aku mulai belajar. Aku mulai memahami bahwa percakapan yang baik bukan percakapan yang selalu berlangsung tanpa jeda. Kadang justru percakapan yang baik adalah percakapan yang bisa berhenti dan dimulai lagi tanpa menjadi aneh. Amelia bisa pergi berjam-jam. Lalu kembali seolah tidak terjadi apa-apa. Membawa cerita baru. Membawa pertanyaan baru. Membawa satu joke yang membuat percakapan kembali hidup. Dan entah kenapa, aku menyukai itu. Mungkin karena di situlah semuanya terasa nyata.",
          "Saat itu aku belum tahu bahwa nama yang awalnya hanya ada di daftar followers akan perlahan menjadi salah satu nama yang paling sering muncul di notifikasiku. Aku juga belum tahu bahwa satu judul buku akan menjadi bagian dari cerita kami. Yang kutahu saat itu cuma satu. Kami mulai berbicara. Dan ternyata, itu sudah cukup untuk membuat cerita bergerak.",
        ],
      },
    ],
  },
  {
    id: "chapter-2",
    order: 2,
    title: "Laut Bercerita",
    status: "available",
    pages: [
      {
        id: "chapter-2-1",
        type: "narrative",
        content: [
          "Ada sesuatu yang aneh dari membaca buku yang direkomendasikan seseorang yang sedang kita kenal. Buku itu jadi terasa sedikit berbeda. Kita tidak hanya membaca ceritanya. Kita juga membayangkan orang yang memilihnya. Kenapa dia suka buku itu? Bagian mana yang paling dia ingat? Apa yang dia rasakan ketika membacanya?",
          "Aku mulai membaca Laut Bercerita setelah Amelia merekomendasikannya. Tidak langsung selesai. Aku mencicil. Sedikit demi sedikit. Sementara itu, percakapan kami tetap berjalan. Ada malam ketika aku sedang membaca beberapa halaman. Lalu berpindah ke chat. Lalu kembali membaca. Kemudian membuka ponsel lagi. Buku itu menjadi sesuatu yang berjalan bersamaan dengan percakapan kami.",
          "Dan ada kepuasan kecil ketika aku akhirnya bisa mengatakan bahwa aku benar-benar membacanya. Reaksi Amelia membuatku tersenyum. Dia senang. Bukan sekadar, \u201Coh, sudah baca.\u201D Ada sesuatu yang lebih terasa dari cara dia menanggapinya. Aku jadi berpikir. Ternyata hal kecil bisa mempunyai ukuran yang berbeda di kepala orang yang berbeda. Bagiku, membaca novel adalah membaca novel. Bagi Amelia, mungkin ada perasaan lain ketika seseorang benar-benar mencoba sesuatu yang dia rekomendasikan.",
          "Aku tidak pernah menganggap diriku sebagai orang yang sangat perhatian. Aku cuma suka mengingat. Kalau seseorang pernah bercerita tentang sesuatu, aku cenderung menyimpannya. Nama. Cerita. Hal yang disukai. Hal yang tidak disukai. Cerita kecil tentang sekolah. Rencana. Candaan. Kadang aku sendiri lupa bahwa aku menyimpan semua itu sampai tanpa sadar menyebutkannya kembali.",
        ],
      },
      {
        id: "chapter-2-2",
        type: "narrative",
        content: [
          "Dan ternyata Amelia memperhatikannya. Dia pernah mengatakan bahwa dia terharu karena hal-hal kecil yang pernah dia ceritakan ternyata diingat. Dia senang ada seseorang yang mau mengingat detail kecil tentang dirinya. Aku membaca kalimat itu dan sempat diam. Karena bagiku, mengingat bukan usaha besar. Tetapi mungkin memang itu yang menarik tentang perhatian.",
          "Kita sering mengira perhatian selalu membutuhkan tindakan besar. Padahal kadang perhatian hanya berbunyi, \u201CAku ingat kamu pernah cerita tentang itu.\u201D Kalimat sesederhana itu bisa membuat seseorang merasa dilihat. Mungkin itu juga sebabnya aku suka membaca. Sebuah buku pada dasarnya adalah kumpulan hal-hal kecil yang sengaja tidak dilupakan. Nama. Peristiwa. Percakapan. Detail yang mungkin kelihatan remeh tetapi akhirnya menjadi penting.",
          "Dan di antara halaman-halaman Laut Bercerita, tanpa sadar aku sedang mengumpulkan detail-detail lain di kehidupan nyata. Tentang Amelia. Tentang caranya bercerita. Tentang cara dia menulis. Tentang kebiasaannya memperpanjang kata sehingga itu terlihat lucu. Tentang bagaimana satu topik bisa berubah menjadi lima topik lain. Tentang bagaimana dia sering bertanya balik. Tentang bagaimana dia bisa lama membalas, lalu kembali membawa cerita seolah tidak ada jarak waktu.",
          "Mungkin aku belum menyadarinya waktu itu. Tetapi membaca buku dan mengenal seseorang ternyata punya kesamaan. Keduanya tidak bisa terburu-buru. Kalau terlalu cepat, kita hanya akan tahu permukaannya. Sedangkan bagian yang paling menarik biasanya muncul ketika kita sudah berjalan cukup jauh.",
        ],
      },
    ],
  },
  {
    id: "chapter-3",
    order: 3,
    title: "WhatsApp dan Panggilan Favorit",
    status: "available",
    pages: [
      {
        id: "chapter-3-1",
        type: "narrative",
        content: [
          "Percakapan kami akhirnya berpindah ke WhatsApp. Perubahan platform sebenarnya sederhana. Tampilan chat berubah. Cara membuka percakapan berubah. Tetapi entah kenapa, rasanya seperti ada ruang baru yang terbuka. Di Instagram, kami terasa seperti dua orang yang kebetulan saling menemukan. Di WhatsApp, kami mulai terasa seperti dua orang yang memang sengaja kembali mencari satu sama lain. Setidaknya begitu rasanya bagiku.",
          "Kami mulai membicarakan sekolah. Keluarga. Novel. Psikologi. Pendidikan. TKA. Magang. Masa depan. Kemudian topik-topik random yang tidak memiliki hubungan dengan semua itu. Ada percakapan yang dimulai dengan sesuatu yang sangat serius lalu berakhir dengan joke lucu. Ada juga percakapan yang dimulai dengan hal sepele lalu tiba-tiba menjadi panjang. Aku menyukai pola itu. Mungkin karena tidak terasa dibuat-buat.",
          "Amelia pernah mengatakan bahwa dia nyaman berbicara denganku. Aku tidak tahu harus memasukkan kalimat itu ke kategori apa. Aku juga tidak ingin memasukkannya ke kategori mana pun. Aku hanya senang mendengarnya.",
          "Pengalaman masa lalu membuatku tahu bahwa terlalu cepat memberi nama pada sebuah perhatian bukan ide yang bagus. Sebelum Amelia, ada seseorang yang pernah dekat denganku. Tidak pernah benar-benar menjadi hubungan resmi. Tetapi aku sempat terlalu antusias. Aku pernah memberikan sesuatu. Pernah menerima cokelat dan mengira itu berarti lebih banyak dari yang sebenarnya. Aku pernah menganggap sebuah perhatian sebagai tanda. Ternyata tidak. Hubungan itu berakhir dengan penolakan. Dia tidak melakukan sesuatu yang salah. Dia hanya tidak merasakan apa yang kurasakan.",
        ],
      },
      {
        id: "chapter-3-2",
        type: "narrative",
        content: [
          "Dan mungkin itu salah satu pelajaran paling penting yang pernah kudapat. Kebaikan tidak selalu berarti ketertarikan. Perhatian tidak selalu berarti perasaan yang sama. Orang bisa membuat kita nyaman tanpa ingin menjadikan kita bagian dari sesuatu yang lebih besar. Sejak itu, aku mencoba lebih hati-hati. Jadi ketika Amelia berkata dia nyaman berbicara denganku, aku memilih untuk cukup menikmati kalimat itu. Tidak lebih.",
          "Kami tetap bertukar cerita. Aku mulai mengenal dunianya sedikit demi sedikit. Dia mengenal duniaku. Kami bahkan mulai membicarakan kemungkinan saling mengajari. Amelia tertarik pada fisika. Sementara informatika masih belum terlalu dipahaminya. Aku kemudian bercanda bahwa dia bisa mengajariku ekonomi dan aku akan mengajarinya informatika. Pembagian tugas yang terlihat sederhana. Walaupun kami belum benar-benar menjalankannya sebagai kegiatan belajar yang terstruktur.",
          "Mungkin justru itu yang menarik. Kami tidak harus memiliki dunia yang sama. Dia tidak harus tahu semuanya yang kuketahui. Aku juga tidak harus memahami semua yang dia pahami. Tetapi ada rasa ingin tahu terhadap dunia satu sama lain. Aku mulai menyadari bahwa rasa nyaman kadang muncul bukan karena dua orang mirip. Tetapi karena mereka mau saling menjelaskan. Ada sesuatu yang menyenangkan ketika seseorang bertanya tentang hal yang selama ini kita anggap biasa. Dan ada sesuatu yang sama menyenangkannya ketika kita mencoba memahami sesuatu yang penting bagi orang lain.",
        ],
      },
      {
        id: "chapter-3-3",
        type: "narrative",
        content: [
          "Ada bagian dari percakapan yang rasanya sulit dijelaskan kalau tidak ikut berada di dalamnya. Namanya inside joke. Dari luar, mungkin biasa saja. Dari dalam, bisa membuat dua orang tertawa hanya karena satu kata. Begitulah Princess bermula. Aku pernah bercanda tentang kenaikan level Amelia. Dari biasa. Menjadi luar biasa. Kemudian entah bagaimana, ada level berikutnya. Princess. Aku mengira akan berhenti di sana. Tentu saja tidak. Amelia menyukai sebutan itu. Dan setelah itu, Princess mulai hidup sendiri dalam percakapan kami.",
        ],
      },
      {
        id: "chapter-3-princess",
        type: "chat",
        messages: [
          { from: "amelia", text: "Princess udah sekolahh kokkk." },
          { from: "amelia", text: "Doain princess kuat yaa." },
        ],
      },
      {
        id: "chapter-3-4",
        type: "narrative",
        content: [
          "Amelia mulai menyebut dirinya Princess. Aku hanya bisa tersenyum. Lucunya, semakin sering digunakan, semakin normal kata itu terdengar. Tetapi mungkin kedekatan memang begitu. Sebuah kata bisa berubah makna karena punya sejarah di belakangnya. Orang lain mungkin membaca Princess sebagai Princess. Aku membaca Princess dan langsung teringat pada percakapan-percakapan panjang yang melahirkan kata itu.",
          "Dan dari sana, percakapan kami bisa berubah ke mana-mana. Salah satunya adalah tentang mimpi. Amelia pernah bercerita tentang mimpi yang terasa nyata. Tentang keadaan ketika dia merasa tidak yakin apakah sebenarnya sudah bangun atau masih bermimpi. Untuk memastikan, dia mencubit tangannya sendiri pelan-pelan. Metode yang sederhana.",
          "Aku justru membawa percakapan ke arah yang lebih absurd. Bagaimana kalau mimpi punya multiplayer mode? Kalau dua orang membuat janji sebelum tidur. Menentukan waktu. Tempat. Skenario. Lalu bertemu di mimpi. Sama-sama sadar. Bisa ngobrol. Bisa menjalankan skenario. Awalnya terdengar seperti ide lucu.",
        ],
      },
      {
        id: "chapter-3-5",
        type: "narrative",
        content: [
          "Kemudian, seperti semua inside joke yang bagus, kami mulai mengembangkannya terlalu jauh. Bagaimana kalau benar-benar berhasil? Bagaimana kalau tidak bisa keluar? Bagaimana kalau salah satu sadar duluan? Bagaimana kalau mimpi punya aturan sendiri? Semakin dibahas, semakin tidak masuk akal. Dan justru karena itu, semakin lucu.",
          "Aku suka percakapan seperti ini. Bukan karena ada makna besar di baliknya. Tetapi karena percakapan itu tidak perlu punya tujuan. Kami hanya mengikuti ke mana joke membawa kami. Sebuah topik yang tadinya tentang pengalaman mimpi berubah menjadi dunia kecil yang hanya ada dalam obrolan kami. Mungkin itu salah satu alasan kenapa percakapan panjang terasa berbeda. Bukan karena setiap kalimat penting. Tetapi karena kita tidak terlalu sibuk memastikan setiap kalimat penting. Kita hanya berbicara. Dan kadang-kadang, itu sudah cukup.",
        ],
      },
    ],
  },
  {
    id: "chapter-4",
    order: 4,
    title: "Tempat Untuk Bercerita",
    status: "placeholder",
    pages: [],
  },
  {
    id: "chapter-5",
    order: 5,
    title: "Hal-Hal yang Tidak Selalu Bisa Dijelaskan",
    status: "placeholder",
    pages: [],
  },
];
