
/**
 * 定时器任务
 */
class TimerTask {
    /**
     * @param maxTime 定时器任务最长时间
     * @param interval 定时器任务每隔interval(:s)执行一次
     */
    constructor(maxTime, interval = 1) {
        this.maxTime = maxTime;

        this.interval = interval;

        this._initProperty();
    }

    _initProperty() {
        this.timerId = null; // 定时器的文件句柄

        this.taskExecuteTime = 0; // 任务执行时长(:s)

        this.stoped = false; // 是否暂停

        this.paused = false; // 暂停
    }
    
    // 开启定时任务
    start() {
        this._clearTimer()

        this._start()
    }

    _start() {
        this.timerId = setTimeout(() => {
            if (this.stoped || this.paused) {
                return; // 定时器停止、暂停
            }

            this.taskExecuteTime = this.taskExecuteTime + this.interval;
            this.onTick(this.taskExecuteTime);

            if (this.taskExecuteTime >= this.maxTime) {
                this.onTimeout(this.maxTime);

                return; // 定时器超时
            }

            this._start();
        }, this.interval * 1000)
    }

    // 停止定时任务
    stop() {
        this._clearTimer(); // 清除定时器，回收内存

        this.stoped = true; // 停止标记位
        this.taskExecuteTime = 0; // 清空执行时长
        this.onFinish();
    }

    // 暂停定时器任务，不清除执行时间
    pause() {
        this.paused = true; // 暂停标记位

        this._clearTimer(); // 清除定时器，回收内存
    }

    // 从暂停恢复
    resume() {
        this._clearTimer(); // 清除定时器，回收内存
        
        this.paused = false;
        this.start(); // 开启
    }

    // 析构
    destruct() {
        this.timerId = null; // 定时器的文件句柄

        this.taskExecuteTime = 0; // 任务执行时长(:s)

        this.stoped = false; // 是否暂停

        this.paused = false; // 暂停
    }

    // 定时器在固定间隔时间interval(:s)得到通知
    onTick( taskExecuteTime ) {}

    // 定时器完成操作
    onFinish() {}

    // 超时操作
    onTimeout(limitTime) {}

    // 清除定时器
    _clearTimer() {
       this.timerId && clearTimeout(this.timerId );

       this.timerId = null
    }
}

export default TimerTask;
