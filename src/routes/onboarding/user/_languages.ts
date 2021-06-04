interface Language {
	code: string
	name: string
}

const languages: Language[] = [
	{
		code: 'ab',
		name: 'Abkhaz (аҧсуа)',
	},
	{
		code: 'aa',
		name: 'Afar (Afaraf)',
	},
	{
		code: 'af',
		name: 'Afrikaans (Afrikaans)',
	},
	{
		code: 'ak',
		name: 'Akan (Akan)',
	},
	{
		code: 'sq',
		name: 'Albanees (Shqip)',
	},
	{
		code: 'am',
		name: 'Amharisch (አማርኛ)',
	},
	{
		code: 'ar',
		name: 'Arabisch (العربية)',
	},
	{
		code: 'an',
		name: 'Aragonese (Aragonés)',
	},
	{
		code: 'hy',
		name: 'Armeens (Հայերեն)',
	},
	{
		code: 'as',
		name: 'Assamese (অসমীয়া)',
	},
	{
		code: 'av',
		name: 'Avarisch (авар мацӀ, магӀарул мацӀ)',
	},
	{
		code: 'ae',
		name: 'Avestan (avesta)',
	},
	{
		code: 'ay',
		name: 'Aymara (aymar aru)',
	},
	{
		code: 'az',
		name: 'Azerbeidzjani (azərbaycan dili)',
	},
	{
		code: 'bm',
		name: 'Bambara (bamanankan)',
	},
	{
		code: 'ba',
		name: 'Bashkir (башҡорт теле)',
	},
	{
		code: 'eu',
		name: 'Baskisch (euskara, euskera)',
	},
	{
		code: 'be',
		name: 'Wit-Russisch (Беларуская)',
	},
	{
		code: 'bn',
		name: 'Bengaals (বাংলা)',
	},
	{
		code: 'bh',
		name: 'Bihari (भोजपुरी)',
	},
	{
		code: 'bi',
		name: 'Bislama (Bislama)',
	},
	{
		code: 'bs',
		name: 'Bosnisch (bosanski jezik)',
	},
	{
		code: 'br',
		name: 'Breton (brezhoneg)',
	},
	{
		code: 'bg',
		name: 'Bulgaars (български език)',
	},
	{
		code: 'my',
		name: 'Birmaans (ဗမာစာ)',
	},
	{
		code: 'ca',
		name: 'Catalaans; (Català)',
	},
	{
		code: 'ch',
		name: 'Chamorro (Chamoru)',
	},
	{
		code: 'ce',
		name: 'Tsjetsje (нохчийн мотт)',
	},
	{
		code: 'ny',
		name: 'Chichewa; (chiCheŵa, chinyanja)',
	},
	{
		code: 'zh',
		name: 'Chinese (中文 (Zhōngwén), 汉语, 漢語)',
	},
	{
		code: 'cv',
		name: 'Chuvash (чӑваш чӗлхи)',
	},
	{
		code: 'kw',
		name: 'Corner (Kernewek)',
	},
	{
		code: 'co',
		name: 'Corsicaans (corsu, lingua corsa)',
	},
	{
		code: 'cr',
		name: 'Cree (ᓀᐦᐃᔭᐍᐏᐣ)',
	},
	{
		code: 'hr',
		name: 'Kroatisch (hrvatski)',
	},
	{
		code: 'cs',
		name: 'Tsjechisch (česky, čeština)',
	},
	{
		code: 'da',
		name: 'Deens (dansk)',
	},
	{
		code: 'dv',
		name: 'Dhivhhi; (ދިވެހި)',
	},
	{
		code: 'nl',
		name: 'Nederlands (Nederlands, Vlaams)',
	},
	{
		code: 'en',
		name: 'Engels (English)',
	},
	{
		code: 'eo',
		name: 'Esperanto (Esperanto)',
	},
	{
		code: 'et',
		name: 'Estlands (eesti, eesti keel)',
	},
	{
		code: 'ee',
		name: 'Ooi (Eʋegbe)',
	},
	{
		code: 'fo',
		name: 'Farroom (føroyskt)',
	},
	{
		code: 'fj',
		name: 'Fijian (vosa Vakaviti)',
	},
	{
		code: 'fi',
		name: 'Fins (suomi, suomen kieli)',
	},
	{
		code: 'fr',
		name: 'Frans (français, langue française)',
	},
	{
		code: 'ff',
		name: 'Fula; (Fulfulde, Pulaar, Pular)',
	},
	{
		code: 'gl',
		name: 'Galicisch (Galego)',
	},
	{
		code: 'ka',
		name: 'Georgisch (ქართული)',
	},
	{
		code: 'de',
		name: 'Duitse (Deutsch)',
	},
	{
		code: 'el',
		name: 'Grieks, modern (Ελληνικά)',
	},
	{
		code: 'gn',
		name: 'Guaraní (Avañeẽ)',
	},
	{
		code: 'gu',
		name: 'Gujarati (ગુજરાતી)',
	},
	{
		code: 'ht',
		name: 'Haïtiaan; (Kreyòl ayisyen)',
	},
	{
		code: 'ha',
		name: 'Hausa (Hausa, هَوُسَ)',
	},
	{
		code: 'he',
		name: 'Hebreeuws (עברית)',
	},
	{
		code: 'iw',
		name: 'Hebreeuws (עברית)',
	},
	{
		code: 'hz',
		name: 'Herero (Otjiherero)',
	},
	{
		code: 'hi',
		name: 'Hindi (हिन्दी, हिंदी)',
	},
	{
		code: 'ho',
		name: 'HIRI MOTU (Hiri Motu)',
	},
	{
		code: 'hu',
		name: 'Hongaars (Magyar)',
	},
	{
		code: 'ia',
		name: 'Interlingua (Interlingua)',
	},
	{
		code: 'id',
		name: 'Indonesisch (Bahasa Indonesia)',
	},
	{
		code: 'ie',
		name: 'Interlingen (Originally called Occidental; then Interlingue after WWII)',
	},
	{
		code: 'ga',
		name: 'Iers (Gaeilge)',
	},
	{
		code: 'ig',
		name: 'Igbo (Asụsụ Igbo)',
	},
	{
		code: 'ik',
		name: 'Inupiaq (Iñupiaq, Iñupiatun)',
	},
	{
		code: 'io',
		name: 'Ik doe (Ido)',
	},
	{
		code: 'is',
		name: 'IJslands (Íslenska)',
	},
	{
		code: 'it',
		name: 'Italiaans (Italiano)',
	},
	{
		code: 'iu',
		name: 'Inuktitut (ᐃᓄᒃᑎᑐᑦ)',
	},
	{
		code: 'ja',
		name: 'Japans (日本語 (にほんご／にっぽんご))',
	},
	{
		code: 'jv',
		name: 'Javaans (basa Jawa)',
	},
	{
		code: 'kl',
		name: 'Kalaallisut, Groenlands (kalaallisut, kalaallit oqaasii)',
	},
	{
		code: 'kn',
		name: 'Kannada (ಕನ್ನಡ)',
	},
	{
		code: 'kr',
		name: 'KANURI (Kanuri)',
	},
	{
		code: 'ks',
		name: 'Kashmiri (कश्मीरी, كشميري‎)',
	},
	{
		code: 'kk',
		name: 'Kazach (Қазақ тілі)',
	},
	{
		code: 'km',
		name: 'Khmer (ភាសាខ្មែរ)',
	},
	{
		code: 'ki',
		name: 'Kikuyu, gikuyu (Gĩkũyũ)',
	},
	{
		code: 'rw',
		name: 'Kinyarwanda (Ikinyarwanda)',
	},
	{
		code: 'ky',
		name: 'Kirghiz, Kirgizië (кыргыз тили)',
	},
	{
		code: 'kv',
		name: 'Komi (коми кыв)',
	},
	{
		code: 'kg',
		name: 'Kongo (KiKongo)',
	},
	{
		code: 'ko',
		name: 'Koreaans (한국어 (韓國語), 조선말 (朝鮮語))',
	},
	{
		code: 'ku',
		name: 'Koerdisch (Kurdî, كوردی‎)',
	},
	{
		code: 'kj',
		name: 'Kwanyama, Kuanyama (Kuanyama)',
	},
	{
		code: 'la',
		name: 'Latijns (latine, lingua latina)',
	},
	{
		code: 'lb',
		name: 'Luxemburgs, Letzeburgessch (Lëtzebuergesch)',
	},
	{
		code: 'lg',
		name: 'Luganda (Luganda)',
	},
	{
		code: 'li',
		name: 'Limburgs, Limburgan, Limburger (Limburgs)',
	},
	{
		code: 'ln',
		name: 'Lingala (Lingála)',
	},
	{
		code: 'lo',
		name: 'Lao (ພາສາລາວ)',
	},
	{
		code: 'lt',
		name: 'Litouws (lietuvių kalba)',
	},
	{
		code: 'lu',
		name: 'Luba-Katanga ()',
	},
	{
		code: 'lv',
		name: 'Letland (latviešu valoda)',
	},
	{
		code: 'gv',
		name: 'Manx (Gaelg, Gailck)',
	},
	{
		code: 'mk',
		name: 'Macedonisch (македонски јазик)',
	},
	{
		code: 'mg',
		name: 'Madagaskar- (Malagasy fiteny)',
	},
	{
		code: 'ms',
		name: 'Maleis- (bahasa Melayu, بهاس ملايو‎)',
	},
	{
		code: 'ml',
		name: 'Malayalam (മലയാളം)',
	},
	{
		code: 'mt',
		name: 'Maltees (Malti)',
	},
	{
		code: 'mi',
		name: 'Maori (te reo Māori)',
	},
	{
		code: 'mr',
		name: 'Marathi (Marāṭhī) (मराठी)',
	},
	{
		code: 'mh',
		name: 'Marshallese (Kajin M̧ajeļ)',
	},
	{
		code: 'mn',
		name: 'Mongools (монгол)',
	},
	{
		code: 'na',
		name: 'Nauru (Ekakairũ Naoero)',
	},
	{
		code: 'nv',
		name: 'Navajo, Navaho (Diné bizaad, Dinékʼehǰí)',
	},
	{
		code: 'nb',
		name: 'Norwegian Bokmål (Norsk bokmål)',
	},
	{
		code: 'nd',
		name: 'North Ndebele (isiNdebele)',
	},
	{
		code: 'ne',
		name: 'Nepali (नेपाली)',
	},
	{
		code: 'ng',
		name: 'Ndonga (Owambo)',
	},
	{
		code: 'nn',
		name: 'Noors Nynorsk (Norsk nynorsk)',
	},
	{
		code: 'no',
		name: 'Noors (Norsk)',
	},
	{
		code: 'ii',
		name: 'Nuosu (ꆈꌠ꒿ Nuosuhxop)',
	},
	{
		code: 'nr',
		name: 'Zuid ndebele (isiNdebele)',
	},
	{
		code: 'oc',
		name: 'Occitaan (Occitan)',
	},
	{
		code: 'oj',
		name: 'Ojibwe, Ojibwa (ᐊᓂᔑᓈᐯᒧᐎᓐ)',
	},
	{
		code: 'cu',
		name: 'Oude kerk Slavisch, kerk Slavisch, kerk Slavisch, oud Bulgaars, oud Slavisch (ѩзыкъ словѣньскъ)',
	},
	{
		code: 'om',
		name: 'Oromo (Afaan Oromoo)',
	},
	{
		code: 'or',
		name: 'Oriya (ଓଡ଼ିଆ)',
	},
	{
		code: 'os',
		name: 'Ossetisch, ossetisch (ирон æвзаг)',
	},
	{
		code: 'pa',
		name: 'Panjabi, Punjabi (ਪੰਜਾਬੀ, پنجابی‎)',
	},
	{
		code: 'pi',
		name: 'Pāli (पाऴि)',
	},
	{
		code: 'fa',
		name: 'Perzisch (فارسی)',
	},
	{
		code: 'pl',
		name: 'Pools (polski)',
	},
	{
		code: 'ps',
		name: 'Pashto, Pushto (پښتو)',
	},
	{
		code: 'pt',
		name: 'Portugees (Português)',
	},
	{
		code: 'qu',
		name: 'Quechua (Runa Simi, Kichwa)',
	},
	{
		code: 'rm',
		name: 'Romansh (rumantsch grischun)',
	},
	{
		code: 'rn',
		name: 'Kirundi (kiRundi)',
	},
	{
		code: 'ro',
		name: 'Roemeens, Moldavisch, Moldavië (română)',
	},
	{
		code: 'ru',
		name: 'Russisch (русский язык)',
	},
	{
		code: 'sa',
		name: 'Sanskriet (saṁskṛta) (संस्कृतम्)',
	},
	{
		code: 'sc',
		name: 'Sardisch (sardu)',
	},
	{
		code: 'sd',
		name: 'Sindhi (सिन्धी, سنڌي، سندھی‎)',
	},
	{
		code: 'se',
		name: 'Noord-Sami (Davvisámegiella)',
	},
	{
		code: 'sm',
		name: 'Samoan (gagana faa Samoa)',
	},
	{
		code: 'sg',
		name: 'Sango (yângâ tî sängö)',
	},
	{
		code: 'sr',
		name: 'Servisch (српски језик)',
	},
	{
		code: 'gd',
		name: 'Schots Gaelic (Gàidhlig)',
	},
	{
		code: 'sn',
		name: 'Shona (chiShona)',
	},
	{
		code: 'si',
		name: 'Singalees (සිංහල)',
	},
	{
		code: 'sk',
		name: 'Slowaaks (slovenčina)',
	},
	{
		code: 'sl',
		name: 'Sloveens (slovenščina)',
	},
	{
		code: 'so',
		name: 'Somalisch (Soomaaliga, af Soomaali)',
	},
	{
		code: 'st',
		name: 'Zuid-Sotho (Sesotho)',
	},
	{
		code: 'es',
		name: 'Spaans; (español, castellano)',
	},
	{
		code: 'su',
		name: 'Soendanees (Basa Sunda)',
	},
	{
		code: 'sw',
		name: 'Swahili (Kiswahili)',
	},
	{
		code: 'ss',
		name: 'Swati (SiSwati)',
	},
	{
		code: 'sv',
		name: 'Zweeds (svenska)',
	},
	{
		code: 'ta',
		name: 'Tamil (தமிழ்)',
	},
	{
		code: 'te',
		name: 'Telugu (తెలుగు)',
	},
	{
		code: 'tg',
		name: 'Tajik (тоҷикӣ, toğikī, تاجیکی‎)',
	},
	{
		code: 'th',
		name: 'Thais (ไทย)',
	},
	{
		code: 'ti',
		name: 'Tigrinya (ትግርኛ)',
	},
	{
		code: 'bo',
		name: 'Tibetaanse standaard, Tibetaans, Centraal (བོད་ཡིག)',
	},
	{
		code: 'tk',
		name: 'Turkmeens (Türkmen, Түркмен)',
	},
	{
		code: 'tl',
		name: 'Tagalog (Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔)',
	},
	{
		code: 'tn',
		name: 'Tswana (Setswana)',
	},
	{
		code: 'to',
		name: 'Tonga (Tonga-eilanden) (faka Tonga)',
	},
	{
		code: 'tr',
		name: 'Turks (Türkçe)',
	},
	{
		code: 'ts',
		name: 'Tsonga (Xitsonga)',
	},
	{
		code: 'tt',
		name: 'Tatar (татарча, tatarça, تاتارچا‎)',
	},
	{
		code: 'tw',
		name: 'Twi (Twi)',
	},
	{
		code: 'ty',
		name: 'Tahitian (Reo Tahiti)',
	},
	{
		code: 'ug',
		name: 'Uighur, uyghur (Uyƣurqə, ئۇيغۇرچە‎)',
	},
	{
		code: 'uk',
		name: 'Oekraïens (українська)',
	},
	{
		code: 'ur',
		name: 'Urdu (اردو)',
	},
	{
		code: 'uz',
		name: 'Oezbeek (zbek, Ўзбек, أۇزبېك‎)',
	},
	{
		code: 've',
		name: 'Venda (Tshivenḓa)',
	},
	{
		code: 'vi',
		name: 'Vietnamees (Tiếng Việt)',
	},
	{
		code: 'vo',
		name: 'Volapük (Volapük)',
	},
	{
		code: 'wa',
		name: 'Waals (Walon)',
	},
	{
		code: 'cy',
		name: 'Welsh (Cymraeg)',
	},
	{
		code: 'wo',
		name: 'Wolof (Wollof)',
	},
	{
		code: 'fy',
		name: 'Fries (Frysk)',
	},
	{
		code: 'xh',
		name: 'Xhosa (isiXhosa)',
	},
	{
		code: 'yi',
		name: 'Jiddisch (ייִדיש)',
	},
	{
		code: 'yo',
		name: 'Yoruba (Yorùbá)',
	},
	{
		code: 'za',
		name: 'Zhuang, Chuang (Saɯ cueŋƅ, Saw cuengh)',
	},
]

export default languages
