const init = () => {
/**
 * @function clearAll() - Очищаем canvas(Обязательная функция);
 * 
 * @param input.init() - Подлючение клавиш;
 * 
 * @param player.liveTime() - Таймер и игровые панели;
 * 
 * @param player.draw() - Отрисовка игрока;
 * 
 * @param player.move() - движение игрока
 * 
 * @param player.skill() - Подлючение способностей игрока
 * 
 * @param player.pause() - Подлючение паузы
 * 
 * @param enemy.init() - Добавление врага
 */
	clearAll();
	
	input.init()
	player.liveTime()
	player.draw()
	player.move()
	player.skill()
	player.pause()
	enemy.init();
}
/**
 *  @param startInit(auth) - Добавляем авторизацию 
 * 
 *  @param startInit(init) - Начало игры без авторизации
 */

startInit(init);