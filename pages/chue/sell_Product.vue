<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <v-app-bar color="grey-darken-4" dark elevation="0" height="60">
      <v-container fluid class="d-flex align-center pa-0">
        <!-- Logo -->
        <v-btn text class="text-h5 font-weight-bold px-4">
          ຮ້ານ HAPPY ຍິນດີຕອນຮັບ
        </v-btn>

        ˝
        <!-- Search Bar -->
        <v-sheet class="flex-grow-1 mx-4">
          <v-text-field
            variant="outlined"
            density="compact"
            placeholder="Search happy store products"
            hide-details
            bg-color="white"
            append-inner-icon="mdi-magnify"
            rounded="0"
          ></v-text-field>
        </v-sheet>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <!-- Hero Banner Section -->
      <v-sheet
        :style="{
          background:
            'linear-gradient(180deg, #F57F17 0%, #F57F17 55%, #FFF3E0 100%)',
        }"
      >
        <v-row class="ma-0 position-relative">
          <!-- Left Arrow -->
          <v-btn
            icon
            color="white"
            elevation="0"
            class="position-absolute"
            style="
              top: 50%;
              left: 20px;
              transform: translateY(-50%);
              z-index: 10;
            "
            variant="text"
          >
            <v-icon size="50">mdi-chevron-left</v-icon>
          </v-btn>

          <!-- Right Arrow -->
          <v-btn
            icon
            color="white"
            elevation="0"
            class="position-absolute"
            style="
              top: 50%;
              right: 20px;
              transform: translateY(-50%);
              z-index: 100;
            "
            variant="text"
          >
            <v-icon size="50">mdi-chevron-right</v-icon>
          </v-btn>

          <!-- Left: Text -->
          <v-col
            cols="12"
            md="6"
            lg="5"
            class="pa-0 pa-md-12 pa-lg-16 align-center"
          >
            <div>
              <p class="text-title-1 mb-12 text-white">+ 2026 ແມ່ນປີຂອງເຈົ້າ</p>

              <h3
                class="text-h3 text-md-h3 font-weight-black text-white"
                style="line-height: 1"
              >
                ສັ່ງຊື້ສິນຄ້າທີ່ຕ້ອງການ
              </h3>
              <h5
                class="text-h5 text-md-h5 ml-6 font-weight-black mt-4 text-white"
                style="line-height: 1"
              >
                ຊື້ຫລາຍກວ່າ 10 ຢ່າງ ມີສ່ວນຫຼຸດ : 5%
              </h5>
            </div>
          </v-col>

          <!-- Right: Products -->
          <v-col
            cols="12"
            md="6"
            lg="7"
            class="pa-4 pa-md-8 d-flex align-center justify-end"
          >
            <div style="position: relative; width: 100%; max-width: 600px">
              <!-- Top row -->
              <div class="d-flex justify-end mb-3 ga-3">
                <v-sheet width="110" height="110" elevation="4" rounded="lg">
                  <v-img
                    src="https://i.etsystatic.com/26166895/r/il/619b16/6361550839/il_680x540.6361550839_noo7.jpg"
                    cover
                    height="110"
                  ></v-img>
                </v-sheet>
                <v-sheet width="110" height="110" elevation="4" rounded="lg">
                  <v-img
                    src="https://i.etsystatic.com/44297209/r/il/ef9d08/6221833552/il_800x800.6221833552_2arw.jpg"
                    cover
                    height="110"
                  ></v-img>
                </v-sheet>
                <v-sheet width="110" height="110" elevation="4" rounded="lg">
                  <v-img
                    src="https://i.etsystatic.com/44297209/r/il/2a3d3e/6337942641/il_800x800.6337942641_sty0.jpg"
                    cover
                    height="110"
                  ></v-img>
                </v-sheet>
                <v-sheet width="110" height="110" elevation="4" rounded="lg">
                  <v-img
                    src="https://i.etsystatic.com/44297209/c/1439/1143/0/493/il/c9f0fb/6181898005/il_800x800.6181898005_itok.jpg"
                    cover
                    height="110"
                  ></v-img>
                </v-sheet>
              </div>

              <!-- Middle row -->
              <div class="d-flex justify-center mb-3 ga-3">
                <v-sheet width="110" height="110" elevation="4" rounded="lg">
                  <v-img
                    src="https://i.etsystatic.com/44297209/c/2250/2250/0/174/il/2efb10/6902317063/il_680x540.6902317063_jaqk.jpg"
                    cover
                    height="110"
                  ></v-img>
                </v-sheet>
                <v-sheet width="110" height="110" elevation="4" rounded="lg">
                  <v-img
                    src="https://i.etsystatic.com/44297209/r/il/371412/7321196423/il_800x800.7321196423_b69w.jpg"
                    cover
                    height="110"
                  ></v-img>
                </v-sheet>
                <v-sheet width="110" height="150" elevation="4" rounded="lg">
                  <v-img
                    src="https://i.etsystatic.com/44297209/r/il/1f394e/6158735194/il_800x800.6158735194_j70p.jpg"
                    cover
                    height="150"
                  ></v-img>
                </v-sheet>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-sheet>

      <!-- Product Cards Section -->
      <v-container fluid class="pa-4" :style="{ backgroundColor: '#ECEFF1' }">
        <v-container
          fluid
          class="py-12"
          style="margin-top: -150px; position: relative"
        >
          <v-row>
            <!-- Card 1 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="1" class="h-100 d-flex flex-column">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Get your game on
                  </h2>
                  <!-- <v-img
                  src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop"
                  aspect-ratio="1.2"
                  contain
                  class="mb-4"
                ></v-img> -->
                  <v-img
                    src="https://i.etsystatic.com/44297209/r/il/2eb72a/7511590352/il_800x800.7511590352_hg3c.jpg"
                    height="300"
                    cover
                    class="mb-4 rounded-lg"
                  />

                  <a href="#" class="text-blue text-decoration-none text-body-2"
                    >Shop gaming</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 2 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Shop Fashion for less
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPT_xxTQvNwizrmvCCvaycqosUqvUSq_STOw&s"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Jeans under $50</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXeupqR1jR5A0aP6czlfJpg3sAWHPT_TJVYQ&s"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Tops under $25</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=150&fit=crop"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Dresses under $30</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTGbIeIrxr-nNMb4RCY1sGSs7ToiR7Tf8kiA&s"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Shoes under $50</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >See all deals</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 3 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    New home arrivals under $50
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://m.media-amazon.com/images/I/410TRwjBCgL._AC._SR240,240.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Kitchen & Dining</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://m.media-amazon.com/images/I/712D1IZkbqL._AC_SR480%2C570_.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Improvement</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://m.media-amazon.com/images/I/41pLhPk6lvL._AC_SR480,440_.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Décor</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://m.media-amazon.com/images/I/31au1ZKNbML._AC_SR480,440_.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Bedding & Bath</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >Shop the latest from Home</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 4 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Shop for your home essentials
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/c19118/6858997696/il_800x800.6858997696_6ccj.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Cleaning Tools</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/527a9b/6751159108/il_800x800.6751159108_3w8l.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Storage</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/b65047/6632351266/il_800x800.6632351266_lk6s.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Decor</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/c/2250/2250/0/552/il/7ac423/6680452963/il_800x800.6680452963_is6v.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Bedding</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >Discover more in Home</a
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <!-- Card 1 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Get your game on
                  </h2>
                  <v-img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYMBKvaCoiw-DhlvCT4JKVbWS3hi_5QRsh3cYa6RPMSc6WO2zqqjqLw1U&s"
                    height="300"
                    cover
                    class="mb-4 rounded-lg"
                  />

                  <a href="#" class="text-blue text-decoration-none text-body-2"
                    >Shop gaming</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 2 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Shop Fashion for less
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/23210883/r/il/362d12/5461906679/il_fullxfull.5461906679_ajlw.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Jeans under $50</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://optimo.com/wp-content/uploads/2023/04/P8A0277-NOIR-1.png"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Tops under $25</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://shop.optimo.com/cdn/shop/files/P8A0206-NOIR_20fcf9c8-199b-475f-b2cf-f51490e17842_900x.png?v=1683882110"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Dresses under $30</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://www.agnoulitahats.com/cdn/shop/files/Grey-Wide-Brim-Center-Dent-Fedora-in-High-quality-Fur-Felt-The-Silkstone-Agnoulita-Hats-5_4c1ee178-9a26-4d2e-9a5e-173a4650169e.webp?v=1763135384&width=1060"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Shoes under $50</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >See all deals</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 3 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    New home arrivals under $50
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/edc4ff/6315610000/il_1588xN.6315610000_9mb4.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Kitchen & Dining</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/56121926/r/il/1f2129/7199446164/il_680x540.7199446164_olx2.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Improvement</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/20233014/r/il/10c8d9/3047764866/il_680x540.3047764866_jkkg.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Décor</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/38478350/r/il/21ae0c/7190698419/il_680x540.7190698419_frll.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Bedding & Bath</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >Shop the latest from Home</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 4 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Shop for your home essentials
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/2a3d3e/6337942641/il_800x800.6337942641_sty0.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Cleaning Tools</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/371412/7321196423/il_800x800.7321196423_b69w.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Storage</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/1f394e/6158735194/il_800x800.6158735194_j70p.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Decor</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/44297209/r/il/288b2d/6076783154/il_800x800.6076783154_gc2d.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Bedding</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >Discover more in Home</a
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <!-- Card 1 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Get your game on
                  </h2>
                  <v-img
                    src="https://i.etsystatic.com/6315610000/r/il/edc4ff/6315610000/il_340x270.6315610000_9mb4.jpg"
                    height="300"
                    cover
                    class="mb-4 rounded-lg"
                  />

                  <a href="#" class="text-blue text-decoration-none text-body-2"
                    >Shop gaming</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 2 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Shop Fashion for less
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/17079222/r/il/088ba1/7456226169/il_680x540.7456226169_349p.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Jeans under $50</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/26166895/r/il/619b16/6361550839/il_680x540.6361550839_noo7.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Tops under $25</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/56121926/r/il/1f2129/7199446164/il_680x540.7199446164_olx2.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Dresses under $30</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.etsystatic.com/35401713/r/il/5e7e97/7458877170/il_680x540.7458877170_ocb6.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Shoes under $50</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >See all deals</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 3 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    New home arrivals under $50
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://5.imimg.com/data5/RB/CN/MY-39077357/mens-fashion-shirt.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Kitchen & Dining</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://m.media-amazon.com/images/I/61srM71RO8L._AC_UF894,1000_QL80_.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Improvement</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://s.alicdn.com/@sc04/kf/Ha9e7610fb0784450a2346f967155a52cF.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Décor</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRyoSrYMSotFUVQ70oayPJmiHzLalzXCS5kw&s"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Bedding & Bath</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >Shop the latest from Home</a
                  >
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Card 4 -->
            <v-col cols="12" sm="6" md="3">
              <v-card elevation="2" class="h-100">
                <v-card-text>
                  <h2 class="text-h6 font-weight-bold mb-4">
                    Shop for your home essentials
                  </h2>
                  <v-row dense>
                    <v-col cols="6">
                      <v-img
                        src="https://i.pinimg.com/736x/52/55/24/52552430795f9e52c6508f6122f2c817.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Cleaning Tools</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://cdn.lookastic.com/looks/shirt-jacket-crew-neck-t-shirt-jeans-original-63118.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Storage</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://i.pinimg.com/736x/f2/58/41/f258414c701bb025d1b626f9a33f64c2.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Home Decor</p>
                    </v-col>
                    <v-col cols="6">
                      <v-img
                        src="https://cdn.onpointfresh.com/wp-content/uploads/2021/12/f7c488b8f9dcec0c56c0d13338c01f3e-mens-street-fashion-mens-fashion.jpg"
                        aspect-ratio="1"
                        cover
                        class="mb-1"
                      ></v-img>
                      <p class="text-caption">Bedding</p>
                    </v-col>
                  </v-row>
                  <a
                    href="#"
                    class="text-blue text-decoration-none text-body-2 mt-2 d-inline-block"
                    >Discover more in Home</a
                  >
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Additional Sections -->

        <v-container fluid>
          <v-sheet class="pa-4">
            <div class="d-flex align-center justify-space-between mb-4">
              <h2 class="text-h5 font-weight-bold text-primary">
                + ສິນຄ້າໃໝ່ມື້ນີ້
              </h2>

              <div
                class="d-flex align-center ga-1 text-primary"
                style="cursor: pointer"
                @click="onSeeMore"
              >
                <span class="text-body-2">See more</span>
                <v-icon size="small">mdi-chevron-right</v-icon>
              </div>
            </div>

            <!-- Products Slide Group -->
            <v-slide-group ref="slideGroup" show-arrows class="pa-2">
              <v-slide-group-item
                v-for="product in productsShoes"
                :key="product.id"
              >
                <v-card class="ma-2" width="200" elevation="0" hover>
                  <v-img :src="product.image" height="200" cover>
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey-lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-container>
        <v-container fluid>
          <v-sheet class="pa-4">
            <div class="d-flex align-center justify-space-between mb-4">
              <h2 class="text-h5 font-weight-bold text-primary">
                + ສິນຄ້າໃໝ່ມື້ນີ້
              </h2>

              <div
                class="d-flex align-center ga-1 text-primary"
                style="cursor: pointer"
                @click="onSeeMore"
              >
                <span class="text-body-2">See more</span>
                <v-icon size="small">mdi-chevron-right</v-icon>
              </div>
            </div>

            <!-- Products Slide Group -->
            <v-slide-group ref="slideGroup" show-arrows class="pa-2">
              <v-slide-group-item
                v-for="product in productsHats"
                :key="product.id"
              >
                <v-card class="ma-2" width="200" elevation="0" hover>
                  <v-img :src="product.image" height="200" cover>
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey-lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-container>
        <v-container fluid>
          <v-sheet class="pa-4">
            <div class="d-flex align-center justify-space-between mb-4">
              <h2 class="text-h5 font-weight-bold text-primary">
                + ສິນຄ້າໃໝ່ມື້ນີ້
              </h2>

              <div
                class="d-flex align-center ga-1 text-primary"
                style="cursor: pointer"
                @click="onSeeMore"
              >
                <span class="text-body-2">See more</span>
                <v-icon size="small">mdi-chevron-right</v-icon>
              </div>
            </div>

            <!-- Products Slide Group -->
            <v-slide-group ref="slideGroup" show-arrows class="pa-2">
              <v-slide-group-item
                v-for="product in productsShirts"
                :key="product.id"
              >
                <v-card class="ma-2" width="200" elevation="0" hover>
                  <v-img :src="product.image" height="200" cover>
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey-lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-container>
        <v-container fluid>
          <v-sheet class="pa-4">
            <div class="d-flex align-center justify-space-between mb-4">
              <h2 class="text-h5 font-weight-bold text-primary">
                + ສິນຄ້າໃໝ່ມື້ນີ້
              </h2>

              <div
                class="d-flex align-center ga-1 text-primary"
                style="cursor: pointer"
                @click="onSeeMore"
              >
                <span class="text-body-2">See more</span>
                <v-icon size="small">mdi-chevron-right</v-icon>
              </div>
            </div>

            <!-- Products Slide Group -->
            <v-slide-group ref="slideGroup" show-arrows class="pa-2">
              <v-slide-group-item
                v-for="product in productsEthnicClothing"
                :key="product.id"
              >
                <v-card class="ma-2" width="200" elevation="0" hover>
                  <v-img :src="product.image" height="200" cover>
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey-lighten-5"
                        />
                      </v-row>
                    </template>
                  </v-img>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </v-container>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer color="grey-darken-3" dark class="mt-12">
      <v-container>
        <v-row>
          <v-col cols="6" md="3">
            <h3 class="text-subtitle-2 font-weight-bold mb-3">
              Get to Know Us
            </h3>
            <p class="text-caption mb-1">Careers</p>
            <p class="text-caption mb-1">Blog</p>
            <p class="text-caption mb-1">About Amazon</p>
          </v-col>
          <v-col cols="6" md="3">
            <h3 class="text-subtitle-2 font-weight-bold mb-3">
              Make Money with Us
            </h3>
            <p class="text-caption mb-1">Sell products on Amazon</p>
            <p class="text-caption mb-1">Become an Affiliate</p>
          </v-col>
          <v-col cols="6" md="3">
            <h3 class="text-subtitle-2 font-weight-bold mb-3">
              Amazon Payment Products
            </h3>
            <p class="text-caption mb-1">Amazon Business Card</p>
            <p class="text-caption mb-1">Shop with Points</p>
          </v-col>
          <v-col cols="6" md="3">
            <h3 class="text-subtitle-2 font-weight-bold mb-3">
              Let Us Help You
            </h3>
            <p class="text-caption mb-1">Your Account</p>
            <p class="text-caption mb-1">Your Orders</p>
            <p class="text-caption mb-1">Shipping Rates & Policies</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const slideGroup = ref();
const onSeeMore = () => {
  // Navigate to products page or emit event
  console.log("See more clicked");
};
const productsShoes = ref([
  // Shoes (10 items)
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    title: "Nike Air Max Sneakers",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    title: "Adidas Running Shoes",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop",
    title: "Leather Dress Shoes",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop",
    title: "Canvas Casual Shoes",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
    title: "High Top Basketball Shoes",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300&h=300&fit=crop",
    title: "Slip-On Loafers",
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
    title: "Hiking Boots",
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=300&fit=crop",
    title: "White Sneakers",
  },
  {
    id: "9",
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
    title: "Running Trainers",
  },
  {
    id: "10",
    image:
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=300&h=300&fit=crop",
    title: "Sandals",
  },
]);
const productsHats = ref([
  // Hats (10 items)
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop&auto=format",
    title: "Baseball Cap",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=300&h=300&fit=crop&auto=format",
    title: "Fedora Hat",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=300&h=300&fit=crop",
    title: "Beanie Winter Hat",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop",
    title: "Bucket Hat",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=300&h=300&fit=crop",
    title: "Sun Hat",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop&auto=format",
    title: "Snapback Cap",
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=300&h=300&fit=crop&auto=format",
    title: "Trucker Hat",
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=300&fit=crop&auto=format",
    title: "Panama Hat",
  },
  {
    id: "9",
    image: "https://m.media-amazon.com/images/I/91ZiX9fQtAL._AC_UY1000_.jpg",
    title: "Newsboy hat",
  },

  {
    id: "10",
    image:
      "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?w=300&h=300&fit=crop&auto=format",
    title: "Cowboy Hat",
  },
]);
const productsShirts = ref([
  // Shirts (10 items)
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop",
    title: "White Dress Shirt",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop",
    title: "Casual T-Shirt",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&h=300&fit=crop",
    title: "Polo Shirt",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=300&h=300&fit=crop",
    title: "Flannel Shirt",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=300&fit=crop",
    title: "Denim Shirt",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop",
    title: "Hawaiian Shirt",
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=300&fit=crop",
    title: "Oxford Shirt",
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop",
    title: "Henley Shirt",
  },
  {
    id: "9",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=300&h=300&fit=crop",
    title: "Graphic T-Shirt",
  },
  {
    id: "10",
    image:
      "https://www.mydesignation.com/cdn/shop/files/starry-night-men-shirt-mydesignation-3867540.jpg?v=1757544356&width=1500",
    title: "Linen Shirt",
  },
]);
const productsEthnicClothing = ref([
  // Hmong Ethnic Clothing (10 items)
  {
    id: "1",
    image:
      "https://i.etsystatic.com/44297209/r/il/dcf84d/7553005917/il_800x800.7553005917_60c0.jpg",
    title: "Traditional Hmong Dress",
  },
  {
    id: "2",
    image:
      "https://i.etsystatic.com/44297209/r/il/19849b/7557527570/il_800x800.7557527570_fpjz.jpg",
    title: "Hmong Embroidered Jacket",
  },
  {
    id: "3",
    image:
      "https://i.etsystatic.com/44297209/r/il/2eb72a/7511590352/il_800x800.7511590352_hg3c.jpg",
    title: "Hmong Pleated Skirt",
  },
  {
    id: "4",
    image:
      "https://i.etsystatic.com/44297209/r/il/7c9c03/7498211498/il_800x800.7498211498_l98s.jpg",
    title: "Hmong Festival Outfit",
  },
  {
    id: "5",
    image:
      "https://i.etsystatic.com/44297209/r/il/7ca779/7157634646/il_800x800.7157634646_o5p1.jpg",
    title: "Hmong Collar Necklace Set",
  },
  {
    id: "6",
    image:
      "https://i.etsystatic.com/44297209/c/1512/1512/0/312/il/4c0584/7153263764/il_800x800.7153263764_kdip.jpg",
    title: "Hmong Traditional Top",
  },
  {
    id: "7",
    image:
      "https://i.etsystatic.com/44297209/r/il/7edddb/7153166898/il_800x800.7153166898_36hq.jpg",
    title: "Hmong Ceremonial Costume",
  },
  {
    id: "8",
    image:
      "https://i.etsystatic.com/44297209/c/1512/1512/0/205/il/9cecfe/7152877220/il_800x800.7152877220_5mcd.jpg",
    title: "Hmong Baby Carrier",
  },
  {
    id: "9",
    image:
      "https://i.etsystatic.com/44297209/r/il/7e0437/6990414529/il_800x800.6990414529_9u8h.jpg",
    title: "Hmong Apron Set",
  },
  {
    id: "10",
    image:
      "https://i.etsystatic.com/44297209/r/il/c19118/6858997696/il_800x800.6858997696_6ccj.jpg",
    title: "Hmong Wedding Dress",
  },
]);

// const products = ref([
//   {
//     id: "1",
//     image:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
//     // discount: "Up to 30% off",
//     title: "Wireless Headphones",
//     // price: "$99.99",
//   },
//   {
//     id: "2",
//     image:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
//     title: "Smart Watch",
//   },
//   {
//     id: "3",
//     image:
//       "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
//     title: "Sunglasses",
//   },
//   {
//     id: "4",
//     image:
//       "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop",
//     title: "Sneakers",
//   },
//   {
//     id: "5",
//     image:
//       "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop",
//     title: "Backpack",
//   },
//   {
//     id: "6",
//     image:
//       "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop",
//     title: "Camera",
//   },
//   {
//     id: "7",
//     image:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop",
//     title: "Laptop",
//   },
//   {
//     id: "8",
//     image:
//       "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300&h=300&fit=crop",
//     title: "Tablet",
//   },
//   {
//     id: "9",
//     image:
//       "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop",
//     title: "Keyboard",
//   },
//   {
//     id: "10",
//     image:
//       "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
//     title: "Speaker",
//   },
// ]);

const scrollPrev = () => {
  if (slideGroup.value) {
    slideGroup.value.$el.querySelector(".v-slide-group__prev")?.click();
  }
};

const scrollNext = () => {
  if (slideGroup.value) {
    slideGroup.value.$el.querySelector(".v-slide-group__next")?.click();
  }
};
</script>

<style scoped></style>
