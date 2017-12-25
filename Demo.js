let msTimerTask = new TimerTask( 60 * 9 );
msTimerTask.onTick = (taskExecuteTime) => {
   console.log('当前秒数：' + taskExecuteTime )
}

 msTimerTask.onTimeout = (limitTime) => {
   console.log('超过最长时间限制：' + limitTime + "秒")
 }
 
 msTimerTask.start() // 启动定时器任务
 
 msTimerTask.stop() // 停止定时器任务
 
 msTimerTask.pause() // 暂停定时器任务
 
 msTimerTask.resume() // 复原定时器任务（从pause -> resume)
