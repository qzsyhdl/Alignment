/**
 * @align 对齐组件
 * @author qzhdl@foxmail.com
 *
 * 所有的对齐都是用offset属性(相对于页面文档的偏移值)
 */

KISSY.add(function(S, Node) {

	/**
	 * 获取元素，元素个数必须大于或等于2
	 */
	function getAlignElems(selectors) {
		var elems = null;

		if (S.isObject(selectors)) {
			elems = selectors

		} else if (/^\./i.test(selectors)) {
			elems = S.all(selectors)

		} else if (S.one(selectors)) {
			elems = S.all(selectors)

		}

		if (elems != null && elems.length > 1) {
			return elems

		} else {
			throw new Error('Align: The number of elements must be greater than one!')

		}
	}


	/**
	 * 获取元素
	 */
	function getAlignElem(selectors) {
		var elems = null;

		if (S.isObject(selectors)) {
			elems = selectors

		} else if(/^#/i.test(selectors)) {
			elems = S.one(selectors)

		} else if (/^\./i.test(selectors)) {
			elems = S.all(selectors)

		} else if (S.one(selectors)) {
			elems = S.all(selectors)

		}

		if (elems != null) {
			return elems

		} else {
			throw new Error('Align: Elements not found');

		}
	}

	/**
	 * 获取对齐元素中最靠顶边的位置
	 * @param {Element} selectors 对齐元素
	 * @return {Number} 最顶边元素的offsetTop值
	 */
	function getMinTop(selectors) {
		var min = Number.MAX_VALUE;
		selectors.each(function(elem) {
			var top = elem.offset().top;
			if (top < min) {
				min = top
			}
		});
		return min
	}

	/**
	 * 获取对齐元素中最靠底边的位置
	 * @param {Element} selectors 对齐元素
	 * @return {Number} 最底边元素的offsetBottom值
	 */
	function getMaxBottom(selectors) {
		var max = Number.MIN_VALUE;
		selectors.each(function(elem) {
			var bottom = elem.offset().top + elem.height();
			if (max < bottom) {
				max = bottom
			}
		});
		return max
	}

	/**
	 * 获取对齐元素中最靠左边的位置
	 * @param {Element} selectors 对齐元素
	 * @return {Number} 最左边元素的offsetLeft值
	 */
	function getMinLeft(selectors) {
		var min = Number.MAX_VALUE;
		selectors.each(function(elem) {
			var left = elem.offset().left;
			if (left < min) {
				min = left
			}
		});
		return min
	}

	/**
	 * 获取对齐元素中最靠右边的位置
	 * @param {Element} selectors 对齐元素
	 * @return {Number} 最右边元素的offsetRigth值
	 */
	function getMaxRight(selectors) {
		var max = Number.MIN_VALUE;
		selectors.each(function(elem) {
			var right = elem.offset().left + elem.width();
			if (max < right) {
				max = right
			}
		});
		return max
	}

	/**
	 * 获取对齐元素中水平居中的位置(两种情况：1、所有元素包含在最大宽度元素里面; 2、与情况一相反)
	 * @param {Element} selectors 对齐元素
	 * @return {Number} 对齐元素水平居中位置
	 */
	function getCenter(selectors) {
		var maxWidth = 0, //最宽元素宽度
			maxWidthLeft = 0, //最宽元素左边位置
			maxWidthRight = 0, //最宽元素右边位置
			bool = true, //所有元素是否包含在最大宽度元素里面
			center = 0; //水平中心位置

		selectors.each(function(elem) {
			var width = elem.width();
			if (maxWidth < width) {
				maxWidth = width;
				maxWidthLeft = elem.offset().left;
				maxWidthRight = maxWidthLeft + maxWidth
			}
		});
		for (var i = 0; i < selectors.length; i++ ) {
			var elem = selectors.item(i),
				left = elem.offset().left, 
				right = left + elem.width();
			if (maxWidthLeft > left || maxWidthRight < right) {
				bool = false;
				break
			}
		}
		if (bool) {
			center = Math.floor((maxWidthLeft + maxWidthRight) / 2)
		} else {
			selectors.each(function(elem) {
				center += elem.offset().left + elem.width() / 2
			});
			center = Math.floor(center / selectors.length)
		}
		return center
	}


	/**
	 * 获取对齐元素中垂直居中的位置(两种情况：1、所有元素包含在最大高度元素里面; 2、与情况一相反)
	 * @param {Element} selectors 对齐元素
	 * @return {Number} 对齐元素垂直居中位置
	 */
	function getMiddle(selectors) {
		var maxHeight = 0, //最高元素高度
			maxHeightTop = 0, //最高元素顶部位置
			maxHeightBottom = 0, //最高元素底部位置
			bool = true, //所有元素是否包含在最大高度元素里面
			middle = 0;
		
		selectors.each(function(elem) {
			var height = elem.height();
			if (maxHeight < height) {
				maxHeight = height;
				maxHeightTop = elem.offset().top;
				maxHeightBottom = maxHeightTop + maxHeight
			}
		});
		for (var i = 0; i < selectors.length; i++ ) {
			var elem = selectors.item(i),
				top = elem.offset().top, 
				bottom = top + elem.height();
			if (maxHeightTop > top || maxHeightBottom < bottom) {
				bool = false;
				break
			}
		}
		if (bool) {
			middle = Math.floor((maxHeightTop + maxHeightBottom) / 2)
		} else {
			selectors.each(function(elem) {
				middle += elem.offset().top + elem.height() / 2
			});
			middle = Math.floor(middle / selectors.length)
		}
		return middle
	}


	/**
	 * 根据元素节点属性按升序排序
	 * @param  {String} cssName [left, top]
	 * @return {Element} 元素节点
	 */
	function getSortAsc(selectors, cssName) {
		var len = selectors.length;
		for (var i = 0; i < len; i++) {
			for (var j = 0; j < len - i - 1; j++) {
				var prev = selectors.item(j).offset()[cssName],
					next = selectors.item(j+1).offset()[cssName];
				if (prev > next) {
					var temp = selectors.item(j);
					selectors[j] = selectors.item(j+1);
					selectors[j+1] = temp
				}
			}
		}
		return selectors
	}

	
	/*// 返回元素位置信息格式
	 var data = [
		{
			'prevX': 200, //对齐前Left值
			'prevY': 200, //对齐前Top值
			'nextX': 400, //对齐后Left值
			'nextY': 400  //对齐后Top值
		},
		{
			'prevX': 200,
			'prevY': 200,
			'nextX': 400,
			'nextY': 400 
		},
		{
			'prevX': 200,
			'prevY': 200,
			'nextX': 400,
			'nextY': 400 
		}
	];*/

	return {
		/**
		 * 顶对齐
		 * @param  {String|Object}   selectors 对齐元素
		 * @param  {Function} callback  回调函数
		 * @return {Array}              元素位置信息
		 */
		top: function(selectors, callback) {
			var selectors = getAlignElems(selectors),
				minTop = getMinTop(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: minTop});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': prevX,
					'nextY': parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data
	
		},
		/**
		 * 底对齐
		 * @param  {String|Object}   selectors 对齐元素
		 * @param  {Function} callback  回调函数
		 * @return {Array}              元素位置信息
		 */
		bottom: function(selectors, callback) {
			var selectors = getAlignElems(selectors),
				maxBottom = getMaxBottom(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem){
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: maxBottom - elem.height()});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': prevX,
					'nextY': parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data
		
		},
		/**
		 * 左对齐
		 * @param  {String|Object}   selectors 对齐元素
		 * @param  {Function} callback  回调函数
		 * @return {Array}              元素位置信息
		 */
		left: function(selectors, callback) {
			var selectors = getAlignElems(selectors),
				minLeft = getMinLeft(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: minLeft});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': parseInt(elem.css('left'), 10),
					'nextY': prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 右对齐
		 * @param  {String|Object}   selectors 对齐元素
		 * @param  {Function} callback  回调函数
		 * @return {Array}              元素位置信息
		 */
		right: function(selectors, callback) {
			var selectors = getAlignElems(selectors),
				maxRight = getMaxRight(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: maxRight - elem.width()});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': parseInt(elem.css('left'), 10),
					'nextY': prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 水平居中对齐
		 * @param  {String|Object}   selectors 对齐元素
		 * @param  {Function} callback  回调函数
		 * @return {Array}              元素位置信息
		 */
		center: function(selectors, callback) {
			var selectors = getAlignElems(selectors),
				center = getCenter(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: center - Math.floor(elem.width() / 2)});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': parseInt(elem.css('left'), 10),
					'nextY': prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 垂直居中对齐
		 * @param  {String|Object}   selectors 对齐元素
		 * @param  {Function} callback  回调函数
		 * @return {Array}              元素位置信息
		 */
		vertical: function(selectors, callback) {
			var selectors = getAlignElems(selectors),
				middle = getMiddle(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: middle - Math.floor(elem.height() / 2)});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': prevX,
					'nextY': parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @param  {Boolean} isIncludeBorder    是否包括边框
		 * @return {Array}                      元素位置信息
		 */
		canvasTop: function(selectors, canvas, callback, isIncludeBorder) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				canvasOffsetTop = canvas.offset().top,
				distance = getMinTop(selectors) - canvasOffsetTop, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				// 与画布对齐不包括边框
				elem.offset({top: elem.offset().top - distance - (isIncludeBorder === true ? 0 : parseInt(elem.css('border-top'), 10))});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': prevX,
					'nextY': parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 与画布顶对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @param  {Boolean} isIncludeBorder    是否包括边框
		 * @return {Array}                      元素位置信息
		 */
		canvasBottom: function(selectors, canvas, callback, isIncludeBorder) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				maxBottom = getMaxBottom(selectors),
				canvasOffsetTop = canvas.offset().top,
				distance = canvasOffsetTop + canvas.height() - maxBottom, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				// 与画布对齐不包括边框
				elem.offset({top: elem.offset().top + distance - (isIncludeBorder === true ? 0 : parseInt(elem.css('border-top'), 10))});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': prevX,
					'nextY': parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 与画布左对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @param  {Boolean} isIncludeBorder    是否包括边框
		 * @return {Array}                      元素位置信息
		 */
		canvasLeft: function(selectors, canvas, callback, isIncludeBorder) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				canvasOffsetLeft = canvas.offset().left,
				distance = getMinLeft(selectors) - canvasOffsetLeft, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				// 与画布对齐不包括边框
				elem.offset({left: elem.offset().left - distance - (isIncludeBorder === true ? 0 : parseInt(elem.css('border-left'), 10))});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': parseInt(elem.css('left'), 10),
					'nextY': prevY
				})

			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data
		},
		/**
		 * 与画布右对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @param  {Boolean} isIncludeBorder    是否包括边框
		 * @return {Array}                      元素位置信息
		 */
		canvasRight: function(selectors, canvas, callback, isIncludeBorder) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				maxRight = getMaxRight(selectors),
				canvasOffsetLeft = canvas.offset().left,
				distance = canvasOffsetLeft + canvas.width() - maxRight, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				// 与画布对齐不包括边框	
				elem.offset({left: elem.offset().left + distance - (isIncludeBorder === true ? 0 : parseInt(elem.css('border-right'), 10))});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': parseInt(elem.css('left'), 10),
					'nextY': prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data
		},
		/**
		 * 与画布水平居中对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @param  {Boolean} isIncludeBorder    是否包括边框
		 * @return {Array}                      元素位置信息
		 */
		canvasCenter: function(selectors, canvas, callback, isIncludeBorder) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				center = getCenter(selectors),
				canvasOffsetLeft = canvas.offset().left,
				distance = canvasOffsetLeft + Math.floor(canvas.width() / 2) - center, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				// 与画布对齐不包括边框	
				elem.offset({left: elem.offset().left + distance - (isIncludeBorder === true ? 0 : parseInt(elem.css('border-left'), 10))});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': parseInt(elem.css('left'), 10),
					'nextY': prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 与画布垂直居中对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @param  {Boolean} isIncludeBorder    是否包括边框
		 * @return {Array}                      元素位置信息
		 */
		canvasVertical: function(selectors, canvas, callback, isIncludeBorder) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				middle = getMiddle(selectors),
				canvasOffsetTop = canvas.offset().top,
				distance = canvasOffsetTop + Math.floor(canvas.height() / 2) - middle, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				// 与画布对齐不包括边框		
				elem.offset({top: elem.offset().top + distance - (isIncludeBorder === true ? 0 : parseInt(elem.css('border-top'), 10))});

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': prevX,
					'nextY': parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 水平排列
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {Number}   space     		排列间距
		 * @param  {Function} callback  		回调函数
		 * @return {Array}            			元素位置信息
		 */
		sortCenter: function(selectors, space, callback) {
			var selectors = getAlignElems(selectors),
				space = parseInt(space, 10),
				data = [];

			if (isNaN(space)) {
				throw new Error('Align: space must be number!')
			}

			selectors = getSortAsc(selectors, 'left');

			selectors.each(function(elem, index) {
				var prevElem = selectors.item(index-1);
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				if (index) {
					elem.offset({left: prevElem.offset().left + prevElem.width() + space})
				}

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': parseInt(elem.css('left'), 10),
					'nextY': prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data
		},
		/**
		 * 垂直排列
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {Number}   space     		排列间距
		 * @param  {Function} callback  		回调函数
		 * @return {Array}             			元素位置信息
		 */
		sortVertical: function(selectors, space, callback) {
			var selectors = getAlignElems(selectors),
				space = parseInt(space, 10),
				data = [];

			if (isNaN(space)) {
				throw new Error('Align: space must be number!')
			}

			selectors = getSortAsc(selectors, 'top');

			selectors.each(function(elem, index) {
				var prevElem = selectors.item(index-1);

				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				if (index) {
					elem.offset({top: prevElem.offset().top + prevElem.height() + space})
				}

				data.push({
					'prevX': prevX,
					'prevY': prevY,
					'nextX': prevX,
					'nextY': parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback != undefined) {
				throw new Error('Align: callback must be function!')

			}
			return data
		}
	}

}, {requires: ['node']});