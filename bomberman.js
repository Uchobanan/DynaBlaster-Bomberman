console.log('hello bomb!');
let kordy = [{
    x: 0,
    y: 0,
    poziom: 0,
    pion: 0,
    bombaX: 0,
    bombaY: 0
}];
let powerups = [{
    bomb_counter: 1,
    range: 1,
    moustache_guy: 10000
}];
let zabici = [{
    player: false
}];
let stats = [{
    score: 0,
    lifes: 2,
    highscore: 0,
    nowa_gra: false,
    minuty: 4,
    sekundy: 0
}];
//kreator postaci
let plansza = document.getElementById('plansza');
let player = document.createElement('img');
player.id = 'player';
player.src = 'gfx/s_srodek.png';
player.style.position = 'absolute';
player.style.zIndex = '2';
player.style.width = '70px';
player.style.height = '70px';
plansza.appendChild(player);
//bloki niezniszczalne
let niezniszczalne_lefty = [];
let niezniszczalne_topy = [];
for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
        if (j % 2 == 1 && i % 2 == 1) {
            let rock = document.createElement('img');
            rock.src = 'gfx/rocky.png';
            rock.style.position = 'absolute';
            rock.style.zIndex = '1';
            rock.style.width = '70px';
            rock.style.height = '70px';
            rock.style.left = 70 * j + 'px';
            rock.style.top = 70 * i + 'px';
            plansza.appendChild(rock);
            niezniszczalne_lefty.push(70 * j);
            niezniszczalne_topy.push(70 * i);
        }
    }
}
// console.log(niezniszczalne_lefty)
// console.log(niezniszczalne_topy)
//bloki zniszczalne (cegły)
let pola_blokow = [
    [5, 5, 4, 0, 0, 0, 0, 0, 4, 5, 5],
    [5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 5],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 5],
    [5, 5, 4, 0, 0, 0, 0, 0, 4, 5, 5]
];
// 7 - odłamek wybuchu
// 6 - boty
// 5 - nie do zajecia
// 4 - konieczne do zajęcia
// 3 - wylosowane zajętę
// 2 - bomby
// 1 - niezniczalne (zajęte)
// 0 - do wylosowania
let cegly_id = [];
function kreator_cegly(zmiennaX, zmiennaY) {
    let cegla = document.createElement('img');
    cegla.src = 'gfx/cegla.png';
    cegla.style.width = '70px';
    cegla.style.height = '70px';
    cegla.style.position = 'absolute';
    cegla.style.left = 70 * zmiennaX + 'px';
    cegla.style.top = 70 * zmiennaY + 'px';
    cegla.style.zIndex = '2';
    cegla.id = zmiennaX + '' + zmiennaY;
    plansza.appendChild(cegla);
    pola_blokow[zmiennaY][zmiennaX] = 3;
    cegly_id.push({ x: zmiennaX, y: zmiennaY });
}
// console.log(pola_blokow)
// console.log(cegly_id)
let zniszczalny_kordy_poziom;
let zniszczalny_kordy_pion;
let bomb_counter_powerup_position = Math.floor(Math.random() * (24 - 4) + 4);
let range_counter_powerup_position = Math.floor(Math.random() * (24 - 4) + 4);
while (bomb_counter_powerup_position == range_counter_powerup_position) {
    range_counter_powerup_position = Math.floor(Math.random() * (24 - 4) + 4);
}
let bomb_powerup_kordy = [];
let range_powerup_kordy = [];
for (let i = 0; i < 24; i++) {
    zniszczalny_kordy_poziom = Math.floor(Math.random() * (11));
    zniszczalny_kordy_pion = Math.floor(Math.random() * (11));
    if (pola_blokow[zniszczalny_kordy_pion][zniszczalny_kordy_poziom] == 0) {
        kreator_cegly(zniszczalny_kordy_poziom, zniszczalny_kordy_pion);
        if (i == bomb_counter_powerup_position) {
            let bomb_counter_powerup = document.createElement('img');
            bomb_counter_powerup.style.width = '70px';
            bomb_counter_powerup.style.height = '70px';
            bomb_counter_powerup.id = 'bomb_powerup';
            bomb_counter_powerup.style.position = 'absolute';
            bomb_counter_powerup.style.left = zniszczalny_kordy_poziom * 70 + 'px';
            bomb_counter_powerup.style.top = zniszczalny_kordy_pion * 70 + 'px';
            bomb_counter_powerup.src = 'gfx/bomb_powerup_dark.png';
            plansza.appendChild(bomb_counter_powerup);
            bomb_powerup_kordy.push(zniszczalny_kordy_poziom, zniszczalny_kordy_pion);
        }
        if (i == range_counter_powerup_position) {
            let range_counter_powerup = document.createElement('img');
            range_counter_powerup.style.width = '70px';
            range_counter_powerup.style.height = '70px';
            range_counter_powerup.id = 'range_powerup';
            range_counter_powerup.style.position = 'absolute';
            range_counter_powerup.style.left = zniszczalny_kordy_poziom * 70 + 'px';
            range_counter_powerup.style.top = zniszczalny_kordy_pion * 70 + 'px';
            range_counter_powerup.src = 'gfx/range_powerup_dark.png';
            plansza.appendChild(range_counter_powerup);
            range_powerup_kordy.push(zniszczalny_kordy_poziom, zniszczalny_kordy_pion);
        }
    }
    else {
        i--;
    }
    for (let x = 0; x < 11; x++) {
        for (let y = 0; y < 11; y++) {
            if (pola_blokow[x][y] == 4) {
                kreator_cegly(y, x);
            }
        }
    }
}
function utylizacja_cegly(y, x) {
    let cegla_id = document.getElementById(x + '' + y);
    // console.log(cegly_id)
    // console.log(x, y)
    setTimeout(() => {
        if (cegly_id.indexOf({ x: x, y: y })) {
            //usuwanie animacji jak znajdziemy bomb++
            let cegla_rm_animation_counter = 0;
            console.log(bomb_powerup_kordy);
            if (x + y == bomb_powerup_kordy[0] + bomb_powerup_kordy[1]) {
                cegla_rm_animation_counter = 30;
            }
            //usuwanie animacji jak znajdziemy range'a
            console.log(range_powerup_kordy);
            if (x + y == range_powerup_kordy[0] + range_powerup_kordy[1]) {
                cegla_rm_animation_counter = 30;
            }
            let cegla_rm_interval = setInterval(() => {
                if ([0, 1, 2, 3, 4].includes(cegla_rm_animation_counter))
                    cegla_id.src = 'gfx/broken_cegla1.png';
                if ([5, 6, 7, 8, 9].includes(cegla_rm_animation_counter))
                    cegla_id.src = 'gfx/broken_cegla2.png';
                if ([10, 11, 12, 13, 14].includes(cegla_rm_animation_counter))
                    cegla_id.src = 'gfx/broken_cegla3.png';
                if ([15, 16, 17, 18, 19].includes(cegla_rm_animation_counter))
                    cegla_id.src = 'gfx/broken_cegla4.png';
                if ([20, 21, 22, 23, 24].includes(cegla_rm_animation_counter))
                    cegla_id.src = 'gfx/broken_cegla5.png';
                if ([25, 26, 27, 28, 29].includes(cegla_rm_animation_counter))
                    cegla_id.src = 'gfx/broken_cegla6.png';
                if (cegla_rm_animation_counter > 29) {
                    clearInterval(cegla_rm_interval);
                    pola_blokow[y][x] = 0;
                    plansza.removeChild(cegla_id);
                }
                cegla_rm_animation_counter++;
            }, 25);
        }
    }, 10);
}
// let bombIsActive: boolean = false
let bombaPoziom = 0;
let bombaPion = 0;
let bomby_id = [];
let kaboom_parts_id = [];
//bomba
function kreator_bomby() {
    //pozycja, grafika, append
    let bomba = document.createElement('img');
    bomba.src = 'gfx/bomba_1.png';
    bomba.style.width = '70px';
    bomba.style.height = '70px';
    bomba.style.position = 'absolute';
    if (player.src.includes('w_') || player.src.includes('a_')) {
        bomba.style.left = 70 * Math.floor(kordy[0].bombaX) + 'px';
        bomba.style.top = 70 * Math.floor(kordy[0].bombaY) + 'px';
        bomba.id = Math.floor(kordy[0].bombaX) + '_' + Math.floor(kordy[0].bombaY);
        pola_blokow[Math.floor(kordy[0].bombaY)][Math.floor(kordy[0].bombaX)] = 2;
        bombaPoziom = Math.floor(kordy[0].bombaX);
        bombaPion = Math.floor(kordy[0].bombaY);
    }
    else {
        bomba.style.left = 70 * Math.ceil(kordy[0].bombaX) + 'px';
        bomba.style.top = 70 * Math.ceil(kordy[0].bombaY) + 'px';
        bomba.id = Math.ceil(kordy[0].bombaX) + '_' + Math.ceil(kordy[0].bombaY);
        pola_blokow[Math.ceil(kordy[0].bombaY)][Math.ceil(kordy[0].bombaX)] = 2;
        bombaPoziom = Math.ceil(kordy[0].bombaX);
        bombaPion = Math.ceil(kordy[0].bombaY);
    }
    bomby_id.push({ x: bombaPoziom, y: bombaPion });
    // console.log(bomby_id)
    plansza.appendChild(bomba);
    //animacja
    let bomb_animation_counter = 0;
    let bomb_animation = setInterval(() => {
        //mały błąd: interwał: 1-3-2-1-2-3
        if ([2, 6, 10, 14].includes(bomb_animation_counter))
            bomba.src = 'gfx/bomba_2.png';
        if ([0, 4, 8, 12, 16].includes(bomb_animation_counter))
            bomba.src = 'gfx/bomba_3.png';
        if ([1, 3, 5, 7, 9, 11, 13, 15].includes(bomb_animation_counter))
            bomba.src = 'gfx/bomba_1.png';
        if (bomb_animation_counter == 17) {
            //koniec animacji - start wybuchu
            bomba.src = 'gfx/kaboom.png';
            // console.log(bomby_id[0])
            // console.log(bomba.id)
            pola_blokow[bomby_id[0].y][bomby_id[0].x] = 0;
            clearInterval(bomb_animation);
            plansza.removeChild(bomba);
            //w środku każdego może ten range jako nowy warunek
            let utylizacja_cegly_prawo_done = false;
            if (bomby_id[0].x < 10) {
                for (let i = 1; i <= powerups[0].range; i++) {
                    if (pola_blokow[bomby_id[0].y][bomby_id[0].x + i] == 3) {
                        if (utylizacja_cegly_prawo_done == false) {
                            utylizacja_cegly(bomby_id[0].y, bomby_id[0].x + i);
                            utylizacja_cegly_prawo_done = true;
                        }
                    }
                }
            }
            let utylizacja_cegly_lewo_done = false;
            if (bomby_id[0].x > 0) {
                for (let i = 1; i <= powerups[0].range; i++) {
                    if (pola_blokow[bomby_id[0].y][bomby_id[0].x - i] == 3) {
                        if (utylizacja_cegly_lewo_done == false) {
                            utylizacja_cegly(bomby_id[0].y, bomby_id[0].x - i);
                            utylizacja_cegly_lewo_done = true;
                        }
                    }
                }
            }
            let utylizacja_cegly_gora_done = false;
            if (bomby_id[0].y > 0) {
                for (let i = 1; i <= powerups[0].range; i++) {
                    if (pola_blokow[bomby_id[0].y - i][bomby_id[0].x] == 3) {
                        if (utylizacja_cegly_gora_done == false) {
                            utylizacja_cegly(bomby_id[0].y - i, bomby_id[0].x);
                            utylizacja_cegly_gora_done = true;
                        }
                    }
                }
            }
            let utylizacja_cegly_dol_done = false;
            if (bomby_id[0].y < 10) {
                for (let i = 1; i <= powerups[0].range; i++) {
                    if (pola_blokow[bomby_id[0].y + i][bomby_id[0].x] == 3) {
                        if (utylizacja_cegly_dol_done == false) {
                            utylizacja_cegly(bomby_id[0].y + i, bomby_id[0].x);
                            utylizacja_cegly_dol_done = true;
                        }
                    }
                }
            }
            //animacja wybuchu i niszczenia cegły (RUCH jak w oryginale dopiero bo ostatniej klatce animacji zepsutej cegły)
            // bomba.style.backgroundColor = 'yellow'
            let kaboom_parts_missing_counter = 0;
            // let dezaktywacja_prawo = false;
            // let dezaktywacja_lewo = false;
            // let dezaktywacja_gora = false;
            // let dezaktywacja_dol = false;
            for (let rangeX = powerups[0].range; rangeX >= -powerups[0].range; rangeX--) {
                let kaboom_part = document.createElement('img');
                kaboom_part.style.width = '70px';
                kaboom_part.style.height = '70px';
                kaboom_part.classList.add('kaboom_part');
                kaboom_part.id = (bomby_id[0].x + rangeX) + ';' + bomby_id[0].y;
                kaboom_part.style.position = 'absolute';
                kaboom_part.style.left = (bomby_id[0].x + rangeX) * 70 + 'px';
                kaboom_part.style.top = bomby_id[0].y * 70 + 'px';
                kaboom_part.style.zIndex = '-1';
                kaboom_part.src = 'gfx/kaboom.png';
                plansza.appendChild(kaboom_part);
                kaboom_parts_id.push({ x: bomby_id[0].x + rangeX, y: bomby_id[0].y, bomb_id: bomba.id });
                if (pola_blokow[bomby_id[0].y][bomby_id[0].x + rangeX] == 3) {
                    if (rangeX < powerups[0].range) {
                        for (let i = rangeX; i <= powerups[0].range; i++) {
                            // console.log('target o ' /* + (powerups[0].range - i) + */ + 'X od cegły')
                        }
                    }
                    // console.log('range w forze ' + rangeX)
                    // console.log('na skraju po prawej - 1 jest cegła')
                    // console.log(document.getElementById((bomby_id[0].x + 1) + ';' + bomby_id[0].y))
                    // console.log((bomby_id[0].x + rangeX) + '' + bomby_id[0].y)
                    kaboom_part.style.visibility = 'hidden';
                    plansza.removeChild(kaboom_part);
                    kaboom_parts_id.pop();
                    kaboom_parts_missing_counter++;
                    // dezaktywacja_prawo = true
                    // dezaktywacja_lewo = true
                }
                //granice mapy
                else if (bomby_id[0].x + rangeX < 0 || bomby_id[0].x + rangeX > 10) {
                    plansza.removeChild(kaboom_part);
                    kaboom_parts_id.pop();
                    kaboom_parts_missing_counter++;
                }
                //niezniszczalne
                else if (pola_blokow[bomby_id[0].y][bomby_id[0].x + rangeX] == 1) {
                    plansza.removeChild(kaboom_part);
                    kaboom_parts_id.pop();
                    kaboom_parts_missing_counter++;
                }
            }
            for (let rangeY = powerups[0].range; rangeY >= -powerups[0].range; rangeY--) {
                if (rangeY != 0) {
                    let kaboom_part = document.createElement('img');
                    kaboom_part.style.width = '70px';
                    kaboom_part.style.height = '70px';
                    kaboom_part.classList.add('kaboom_part');
                    kaboom_part.id = bomby_id[0].x + ';' + (bomby_id[0].y + rangeY);
                    kaboom_part.style.position = 'absolute';
                    kaboom_part.style.left = bomby_id[0].x * 70 + 'px';
                    kaboom_part.style.top = (bomby_id[0].y + rangeY) * 70 + 'px';
                    kaboom_part.style.zIndex = '-1';
                    kaboom_part.src = 'gfx/kaboom.png';
                    plansza.appendChild(kaboom_part);
                    kaboom_parts_id.push({ x: bomby_id[0].x, y: bomby_id[0].y + rangeY, bomb_id: bomba.id });
                    if (bomby_id[0].y + rangeY >= 0 && bomby_id[0].y + rangeY <= 10) {
                        if (pola_blokow[bomby_id[0].y + rangeY][bomby_id[0].x] == 3) {
                            if (rangeY < powerups[0].range) {
                                for (let i = rangeY; i <= powerups[0].range; i++) {
                                    // console.log('target o ' /* + (powerups[0].range - i) + */ + 'Y od cegły')
                                }
                            }
                            // console.log('range w forze ' + rangeY)
                            // console.log('na skraju po prawej - 1 jest cegła')
                            // console.log(document.getElementById((bomby_id[0].x + 1) + ';' + bomby_id[0].y))
                            // console.log(bomby_id[0].x + '' + (bomby_id[0].y + rangeY))
                            kaboom_part.style.visibility = 'hidden';
                            plansza.removeChild(kaboom_part);
                            kaboom_parts_id.pop();
                            kaboom_parts_missing_counter++;
                            // dezaktywacja_gora = true
                            // dezaktywacja_dol = true
                            console.log(rangeY);
                        }
                        //niezniszczalne
                        else if (pola_blokow[bomby_id[0].y + rangeY][bomby_id[0].x] == 1) {
                            plansza.removeChild(kaboom_part);
                            kaboom_parts_id.pop();
                            kaboom_parts_missing_counter++;
                        }
                    }
                    //granice mapy
                    else if (bomby_id[0].y + rangeY < 0 || bomby_id[0].y + rangeY > 10) {
                        plansza.removeChild(kaboom_part);
                        kaboom_parts_id.pop();
                        kaboom_parts_missing_counter++;
                    }
                }
            }
            // bomby_id.shift()
            //animacja wybuchu, czas zabijania
            let kaboom_animation_counter = 1;
            let kaboom_collection = document.getElementsByClassName('kaboom_part');
            let this_kaboom_part;
            let kaboom_collection_arr = [];
            //zmienna do porównania z bomb counter przy kliknieciu spacji
            bombs_on_map--;
            let wybuch = setInterval(() => {
                for (let each_kaboom_counter = 0; each_kaboom_counter < kaboom_collection.length; each_kaboom_counter++) {
                    this_kaboom_part = kaboom_collection[each_kaboom_counter];
                    this_kaboom_part.style.opacity = kaboom_animation_counter.toString();
                    if (kaboom_collection_arr.length < (4 * powerups[0].range) + 1 - kaboom_parts_missing_counter)
                        kaboom_collection_arr.push(this_kaboom_part);
                }
                if (kaboom_animation_counter <= 0) {
                    clearInterval(wybuch);
                    //usuwanie wybuchu
                    for (let shift = 0; shift < (4 * powerups[0].range) + 1 - kaboom_parts_missing_counter; shift++) {
                        plansza.removeChild(kaboom_collection_arr[shift]);
                        // kaboom_parts_id.shift()
                    }
                    // console.log(kaboom_collection_arr)
                    kaboom_parts_id = [];
                    bomby_id.shift();
                }
                kaboom_animation_counter -= 0.1;
            }, 75);
        }
        else {
            bomb_animation_counter++;
        }
    }, 180);
}
//(sprawdzanie kolizji player - niezniczalny blok - reszta w keydown)
let blokada_blok_poziom = false;
let blokada_blok_pion = false;
let blokada_blok_prawo = false;
let blokada_blok_lewo = false;
let blokada_blok_gora = false;
let blokada_blok_dol = false;
let bombs_on_map = 0;
document.addEventListener('keydown', function ruch(e) {
    if (!zabici[0].player) {
        switch (e.key) {
            case 'd':
                if (kordy[0].poziom != 700) {
                    if (!blokada_blok_poziom) {
                        if (!blokada_blok_prawo) {
                            kordy[0].poziom += 5;
                        }
                    }
                    else {
                        if (kordy[0].bombaY > 0 && kordy[0].bombaY < 10) {
                            if ((pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX + 1] == 3 || pola_blokow[kordy[0].bombaY][kordy[0].bombaX + 1] == 3 || pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX + 1] == 3)) {
                                //wyjątek ukosa na brzegu od góry (bez granic)
                                if (kordy[0].bombaY * 70 > kordy[0].pion && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX + 1] == 3 && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX + 1] != 3)
                                    ukos_pion(e.key);
                                //wyjątek ukosa na brzegu od dołu (bez granic)
                                else if (kordy[0].bombaY * 70 < kordy[0].pion && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX + 1] == 3 && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX + 1] != 3)
                                    ukos_pion(e.key);
                            }
                            else {
                                ukos_pion(e.key);
                            }
                        }
                        else {
                            if (kordy[0].bombaX < 10)
                                // granica górna - ukosy
                                ukos_pion(e.key);
                        }
                    }
                }
                break;
            case 'a':
                if (kordy[0].poziom > 0) {
                    if (!blokada_blok_poziom) {
                        if (!blokada_blok_lewo) {
                            kordy[0].poziom -= 5;
                        }
                    }
                    else {
                        if (kordy[0].bombaY > 0 && kordy[0].bombaY < 10) {
                            if ((pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX - 1] == 3 || pola_blokow[kordy[0].bombaY][kordy[0].bombaX - 1] == 3 || pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX - 1] == 3)) {
                                //wyjątek ukosa na brzegu od góry (bez granic)
                                if (kordy[0].bombaY * 70 > kordy[0].pion && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX - 1] == 3 && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX - 1] != 3)
                                    ukos_pion(e.key);
                                //wyjątek ukosa na brzegu od dołu (bez granic)
                                else if (kordy[0].bombaY * 70 < kordy[0].pion && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX - 1] == 3 && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX - 1] != 3)
                                    ukos_pion(e.key);
                            }
                            else {
                                ukos_pion(e.key);
                            }
                        }
                        else {
                            if (kordy[0].bombaX > 0)
                                // granica górna - ukosy
                                ukos_pion(e.key);
                        }
                    }
                }
                break;
            case 's':
                if (kordy[0].pion != 700) {
                    if (!blokada_blok_pion) {
                        if (!blokada_blok_dol) {
                            kordy[0].pion += 5;
                        }
                    }
                    else {
                        if ((pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX + 1] == 3 || pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX] == 3 || pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX - 1] == 3)) {
                            //wyjątek ukosa na brzegu od lewej
                            if (kordy[0].bombaX * 70 > kordy[0].poziom && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX + 1] == 3 && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX - 1] != 3)
                                ukos_poziom(e.key);
                            //wyjątek ukosa na brzegu od prawej
                            else if (kordy[0].bombaX * 70 < kordy[0].poziom && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX - 1] == 3 && pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX + 1] != 3)
                                ukos_poziom(e.key);
                        }
                        else {
                            ukos_poziom(e.key);
                        }
                    }
                }
                break;
            case 'w':
                if (kordy[0].pion > 0) {
                    if (!blokada_blok_pion) {
                        if (!blokada_blok_gora) {
                            kordy[0].pion -= 5;
                        }
                    }
                    else {
                        if ((pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX + 1] == 3 || pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX] == 3 || pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX - 1] == 3)) {
                            //wyjątek ukosa na brzegu od lewej
                            if ((kordy[0].bombaX * 70 > kordy[0].poziom && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX + 1] == 3 && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX - 1] != 3)) {
                                // console.log('wchodzi tu')
                                ukos_poziom(e.key);
                            }
                            //wyjątek ukosa na brzegu od prawej
                            else if (kordy[0].bombaX * 70 < kordy[0].poziom && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX - 1] == 3 && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX + 1] != 3) {
                                ukos_poziom(e.key);
                            }
                        }
                        else {
                            // if ((pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX - 1] != 2 && (pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX] != 2 && pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX + 2] == 3))) {
                            //     console.log('xddd')
                            ukos_poziom(e.key);
                            // }
                        }
                    }
                }
                break;
            case ' ':
                console.log(pola_blokow);
                if (pola_blokow[kordy[0].bombaY][kordy[0].bombaX] != 2) {
                    if (bombs_on_map < powerups[0].bomb_counter) {
                        bombs_on_map++;
                        kreator_bomby();
                    }
                }
                break;
        }
        //sprawdzanie kolizji player - niezniczalny blok
        //blokowanie poziome
        if ((Number.isInteger(kordy[0].pion / 70)) && (kordy[0].pion / 70) % 2 == 0) {
            blokada_blok_poziom = false;
        }
        else {
            blokada_blok_poziom = true;
        }
        //ukos przy niezniszczalnych
        function ukos_poziom(przycisk) {
            //od brzegu do brzegu
            if (Math.floor(kordy[0].x) % 2 == 0) {
                if (!Number.isInteger(kordy[0].poziom / 70)) {
                    if (kordy[0].poziom / 70 < kordy[0].x) {
                        kordy[0].poziom += 5;
                    }
                    else {
                        kordy[0].poziom -= 5;
                    }
                    //schodzenie na ukos
                    if (Math.abs(kordy[0].x - kordy[0].poziom / 70) < 0.5) {
                        if (przycisk == 's')
                            kordy[0].pion += 5;
                        else
                            kordy[0].pion -= 5;
                    }
                }
            }
            //od środka do brzegu
            else {
                if (!Number.isInteger(kordy[0].poziom / 70)) {
                    if (kordy[0].poziom / 70 < kordy[0].x) {
                        kordy[0].poziom -= 5;
                    }
                    else {
                        kordy[0].poziom += 5;
                    }
                    if (Math.abs(kordy[0].x - kordy[0].poziom / 70) > 0.5) {
                        if (przycisk == 's')
                            kordy[0].pion += 5;
                        else
                            kordy[0].pion -= 5;
                    }
                }
            }
        }
        //blokowanie pionowe
        if ((Number.isInteger(kordy[0].poziom / 70)) && (kordy[0].poziom / 70) % 2 == 0) {
            blokada_blok_pion = false;
        }
        else {
            blokada_blok_pion = true;
        }
        function ukos_pion(przycisk) {
            //od brzegu do brzegu
            if (Math.floor(kordy[0].y) % 2 == 0) {
                if (!Number.isInteger(kordy[0].pion / 70)) {
                    if (kordy[0].pion / 70 < kordy[0].y) {
                        kordy[0].pion += 5;
                    }
                    else {
                        kordy[0].pion -= 5;
                    }
                    if (Math.abs(kordy[0].y - kordy[0].pion / 70) < 0.5) {
                        if (przycisk == 'd')
                            kordy[0].poziom += 5;
                        else
                            kordy[0].poziom -= 5;
                    }
                }
            }
            //od środka do brzegu
            else {
                if (!Number.isInteger(kordy[0].pion / 70)) {
                    if (kordy[0].pion / 70 < kordy[0].y) {
                        kordy[0].pion -= 5;
                    }
                    else {
                        kordy[0].pion += 5;
                    }
                    if (Math.abs(kordy[0].y - kordy[0].pion / 70) > 0.5) {
                        if (przycisk == 'd')
                            kordy[0].poziom += 5;
                        else {
                            kordy[0].poziom -= 5;
                        }
                    }
                }
            }
        }
        document.getElementById('player').style.left = kordy[0].poziom + 'px';
        document.getElementById('player').style.top = kordy[0].pion + 'px';
    }
});
//animacja chodzenia
let event_timestamp = 0;
let animation_counter = 0;
document.addEventListener('keypress', function animacja(e) {
    if (!zabici[0].player) {
        if (e.timeStamp - event_timestamp <= 50) {
            let player_img = document.getElementById('player');
            // console.log(animation_counter)
            if (e.key == 'w' || e.key == 'a' || e.key == 's' || e.key == 'd') {
                if ([0, 1, 2, 3, 4].includes(animation_counter))
                    player_img.src = 'gfx/' + e.key + '_lewo.png';
                if ([5, 6, 7, 8, 9, 15, 16, 17, 18, 19].includes(animation_counter))
                    player_img.src = 'gfx/' + e.key + '_srodek.png';
                if ([10, 11, 12, 13, 14].includes(animation_counter))
                    player_img.src = 'gfx/' + e.key + '_prawo.png';
            }
        }
        else {
            let player_img = document.getElementById('player');
            if (e.key == 'w' || e.key == 'a' || e.key == 's' || e.key == 'd') {
                player_img.src = 'gfx/' + e.key + '_srodek.png';
            }
        }
        if (animation_counter == 19)
            animation_counter = 0;
        else
            animation_counter++;
        event_timestamp = e.timeStamp;
    }
});
document.addEventListener('keyup', function (e) {
    if (!zabici[0].player) {
        let player_img = document.getElementById('player');
        if (e.key == 'w' || e.key == 'a' || e.key == 's' || e.key == 'd')
            player_img.src = 'gfx/' + e.key + '_srodek.png';
    }
});
let h1 = document.querySelector('h1');
h1.innerHTML = kordy[0].x + ',' + kordy[0].y;


//czas
let minuty = 4;
let sekundy = 0;
document.getElementById('czas').innerHTML = minuty + ' : 0' + sekundy;
let time_interval = setInterval(() => {
    if (sekundy > 0) {
        sekundy--;
    }
    else {
        sekundy = 59;
        minuty--;
    }
    if (sekundy < 10)
        document.getElementById('czas').innerHTML = minuty + ' : 0' + sekundy;
    else
        document.getElementById('czas').innerHTML = minuty + ' : ' + sekundy;
    if (minuty == 0 && sekundy == 0) {
        clearInterval(time_interval);
        minuty = 0;
        sekundy = 0;
        document.getElementById('czas').innerHTML = minuty + ' : 0' + sekundy;
        // alert('koniec czasu!')
    }
}, 1000);
let bomb_powerup_zdobyty = false;
let bomb_powerup = document.getElementById('bomb_powerup');
let range_powerup = document.getElementById('range_powerup');
let range_powerup_zdobyty = false;
render();
function render() {
    //RENDER
    //Z-index - nachodzenie na siebie postaci
    let powerup_shine = 0;
    zabici[0].player = false;
    let render = setInterval(() => {
        //update XY, pion/poziom
        if (Number.isInteger(kordy[0].poziom / 14)) {
            kordy[0].x = kordy[0].poziom / 70;
        }
        if (Number.isInteger(kordy[0].pion / 14)) {
            kordy[0].y = kordy[0].pion / 70;
        }
        if (Number.isInteger(kordy[0].poziom * 2 / 14)) {
            kordy[0].bombaX = kordy[0].poziom / 70;
        }
        if (Number.isInteger(kordy[0].pion * 2 / 14)) {
            kordy[0].bombaY = kordy[0].pion / 70;
        }
        //potem dodanie warunków do ukosów
        if (player.src.includes('w_') || player.src.includes('a_')) {
            kordy[0].bombaX = Math.floor(kordy[0].bombaX);
            kordy[0].bombaY = Math.floor(kordy[0].bombaY);
        }
        else {
            kordy[0].bombaX = Math.ceil(kordy[0].bombaX);
            kordy[0].bombaY = Math.ceil(kordy[0].bombaY);
        }
        // sprawdzanie kolizji player - zniczalny blok (reszta przy odpalaniu ukosów)
        //może zostawic jednak kordy[0].x i y
        if (kordy[0].bombaX < 10) {
            if (pola_blokow[kordy[0].bombaY][kordy[0].bombaX + 1] == 3 || pola_blokow[kordy[0].bombaY][kordy[0].bombaX + 1] == 2) {
                if (Number.isInteger(kordy[0].poziom / 14))
                    blokada_blok_prawo = true;
                else
                    blokada_blok_prawo = false;
            }
            else
                blokada_blok_prawo = false;
        }
        if (kordy[0].bombaX > 0) {
            if (pola_blokow[kordy[0].bombaY][kordy[0].bombaX - 1] == 3 || pola_blokow[kordy[0].bombaY][kordy[0].bombaX - 1] == 2) {
                if (Number.isInteger(kordy[0].poziom / 14))
                    blokada_blok_lewo = true;
                else
                    blokada_blok_lewo = false;
            }
            else
                blokada_blok_lewo = false;
        }
        if (kordy[0].bombaY > 0) {
            if (pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX] == 3 || pola_blokow[kordy[0].bombaY - 1][kordy[0].bombaX] == 2) {
                if (Number.isInteger(kordy[0].pion / 14))
                    blokada_blok_gora = true;
                else
                    blokada_blok_gora = false;
            }
            else
                blokada_blok_gora = false;
        }
        if (kordy[0].bombaY < 10) {
            if (pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX] == 3 || pola_blokow[kordy[0].bombaY + 1][kordy[0].bombaX] == 2) {
                if (Number.isInteger(kordy[0].pion / 14))
                    blokada_blok_dol = true;
                else
                    blokada_blok_dol = false;
            }
            else
                blokada_blok_dol = false;
        }
        //kolizja bomba - player
        for (let z = 0; z < kaboom_parts_id.length; z++) {
            if (kaboom_parts_id[z].x == kordy[0].bombaX && kaboom_parts_id[z].y == kordy[0].bombaY) {
                clearInterval(render);
                death();
            }
        }
        //wejście na zwiększanie bomb
        //świecenie powerupów
        if (!bomb_powerup_zdobyty) {
            if (powerup_shine % 30 == 0) {
                bomb_powerup.src = 'gfx/bomb_powerup_dark.png';
            }
            if (powerup_shine % 30 == 15)
                bomb_powerup.src = 'gfx/bomb_powerup_light.png';
            if (kordy[0].bombaX == (parseInt(bomb_powerup.style.left) / 70) && kordy[0].bombaY == (parseInt(bomb_powerup.style.top) / 70)) {
                powerups[0].bomb_counter++;
                plansza.removeChild(bomb_powerup);
                bomb_powerup_zdobyty = true;
            }
        }
        if (!range_powerup_zdobyty) {
            if (powerup_shine % 30 == 0) {
                range_powerup.src = 'gfx/range_powerup_dark.png';
            }
            if (powerup_shine % 30 == 15)
                range_powerup.src = 'gfx/range_powerup_light.png';
            if (kordy[0].bombaX == (parseInt(range_powerup.style.left) / 70) && kordy[0].bombaY == (parseInt(range_powerup.style.top) / 70)) {
                powerups[0].range++;
                plansza.removeChild(range_powerup);
                range_powerup_zdobyty = true;
            }
        }
        let h1 = document.querySelector('h1');
        h1.innerHTML = kordy[0].bombaX + ',' + kordy[0].bombaY;
        //MEH
        // console.log(kordy[0].bombaX, kordy[0].bombaY)
        // console.log(kaboom_parts_id)
        powerup_shine++;
    }, 25);
}
//śmierć
function death() {
    if (!stats[0].nowa_gra) {
        zabici[0].player = true;
        // animacja umierania playera
        let umieransko_animation_counter = 0;
        let umieransko_animation = setInterval(() => {
            if ([0, 2, 4].includes(umieransko_animation_counter))
                player.src = 'gfx/death1.png';
            if ([1, 3, 5].includes(umieransko_animation_counter))
                player.src = 'gfx/death2.png';
            if ([6, 7, 8, 9, 10, 11].includes(umieransko_animation_counter))
                player.src = 'gfx/death' + (umieransko_animation_counter - 3) + '.png';
            if (umieransko_animation_counter == 12) {
                clearInterval(umieransko_animation);
                player.style.visibility = 'hidden';
            }
            umieransko_animation_counter++;
        }, 225);
        setTimeout(() => {
            after_death();
        }, 3500);
    }
    else {
        zabici[0].player = true;
        after_death();
        setTimeout(() => {
            let baner = document.getElementById('baner_root');
            let audio = document.getElementById('audio_pick');
            baner.style.visibility = 'visible';
            plansza.style.visibility = 'visible';
            audio.style.visibility = 'visible';
            player.style.visibility = 'visible';
            document.body.style.border = '5px solid white';
        }, 4000);
    }
}
function after_death() {
    player.style.zIndex = '3';
    // alert('smierc')
    let alert = document.createElement('div');
    alert.style.zIndex = '5';
    alert.style.width = '100%';
    alert.style.height = '100%';
    alert.id = 'alert';
    alert.style.position = 'absolute';
    alert.style.top = '0';
    alert.style.left = '0';
    alert.style.display = 'flex';
    alert.style.justifyContent = 'center';
    alert.style.alignItems = 'center';
    alert.style.backgroundColor = 'black';
    //może potem wrzucić go do timeouta
    if (stats[0].lifes > 0) {
        alert.id = 'stage info';
        // let stage_info = document.getElementById('stage info')
        alert.innerHTML = '<img src="gfx/stage info.png" style="position:absolute;top:390px">';
    }
    else {
        alert.id = 'game over';
        alert.innerHTML = '<img src="gfx/game_over.png" style="width:770px;height:600px;position:absolute;top:120px">';
    }
    document.body.appendChild(alert);
    let alert_animation_counter = 0;
    let alert_on = setInterval(() => {
        alert.style.opacity = alert_animation_counter.toString();
        if (alert_animation_counter > 1) {
            clearInterval(alert_on);
            stats[0].lifes--;
            document.getElementById('zycia').innerText = stats[0].lifes + '';
            player.style.visibility = 'visible';
            kordy[0].poziom = 0;
            kordy[0].pion = 0;
            player.style.left = '0px';
            player.style.top = '0px';
            player.src = 'gfx/s_srodek.png';
            //inne funkcje?
        }
        alert_animation_counter += 0.1;
    }, 50);
    if (stats[0].lifes > 0) {
        //rozjaśnianie
        setTimeout(() => {
            let alert_animation_counter = 1;
            let alert_off = setInterval(() => {
                alert.style.opacity = alert_animation_counter.toString();
                if (alert_animation_counter < 0) {
                    clearInterval(alert_off);
                    document.body.removeChild(alert);
                    render();
                }
                alert_animation_counter -= 0.1;
            }, 50);
        }, 5000);
    }
    else {
        let baner = document.getElementById('baner_root');
        let audio = document.getElementById('audio_pick');
        document.body.style.border = 'none';
        baner.style.visibility = 'hidden';
        plansza.style.visibility = 'hidden';
        audio.style.visibility = 'hidden';
        player.style.visibility = 'hidden';
        document.addEventListener('keydown', function reset(e) {
            if (e.key == ' ') {
                stats[0].nowa_gra = true;
                stats[0].lifes = 3;
                document.getElementById('zycia').innerText = stats[0].lifes + '';
                death();
                player.style.visibility = 'hidden';
                let game_over = document.getElementById('game over');
                document.body.removeChild(game_over);
                document.removeEventListener('keydown', reset);
                stats[0].nowa_gra = false;
            }
        });
    }
}
