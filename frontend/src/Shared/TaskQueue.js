var $ = require('jquery');
var _ = require('underscore');

const TaskQueue = function(options) {
  _.extend(this, options);
};

_.extend(TaskQueue.prototype, {

  _tasks: [],
  runningJobCount: 0,
  concurrentJobs: 1,

  enqueue(func) {
    const promise = $.Deferred();
    this._tasks.push({
      func,
      promise
    });

    this.startWork();
    return promise.promise();
  },

  startWork() {
    while (this._tasks.length && this.concurrentJobs > this.runningJobCount) {
      this.processItem();
    }

    if (!this._tasks.length) {
      console.log('[TaskQueue] No more tasks to process');
    }
  },

  processItem() {
    this.runningJobCount++;
    console.log(`[TaskQueue] ${this._tasks.length} items left to process`);
    const task = this._tasks.shift();
    if (task) {
      task.func().
        done(task.promise.resolve).
        fail(task.promise.reject).
        always(() => {
          this.runningJobCount--;
          this.startWork();
        });
    } else {
      this.runningJobCount--;
    }
  }
});

export default TaskQueue;
