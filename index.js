/**
 * @align 对齐组件
 * @author dinglun.hong@gmail.com
 *
 * 所有的对齐都是用offset属性(相对于页面文档的偏移值)
 */
KISSY.add(function(S, Node) {

	/**
	 * 获取对齐元素
	 * @param  {String|HTMLCollection|Array<HTMLElement}  selectors 元素
	 * @param  {Boolean} 								  isMulti   元素个数是否必须大于1
	 * @return {HTMLCollection}            				  元素集合
	 */
	function getAlignElem(selectors, isMulti) {
		if (S.isObject(selectors)) {
			selectors = selectors

		} else if(/^#/i.test(selectors)) {
			selectors = S.one(selectors)

		} else if (/^\./i.test(selectors)) {
			selectors = S.all(selectors)

		} else if (S.one(selectors)) {
			selectors = isMulti === true ? S.all(selectors) : S.one(selectors)

		}

		if (isMulti === true) {
			if (selectors != null && selectors.length > 1) {
				return selectors

			} else {
				throw new Error('Align: The number of elements must be greater than one!')
			}
		} else {
			if (selectors != null && selectors.length > 0) {
				return selectors

			} else {
				throw new Error('Align: Element not found');
			}
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
		selectors = Array.prototype.slice.call(selectors);
		selectors.sort(function(a, b) {
			return parseInt(a.style[cssName], 10) > parseInt(b.style[cssName], 10)
		});

		return S.all(selectors)
	}

	
	return {
		/**
		 * 顶对齐
		 * @param  {String|Object}   selectors 对齐元素
		 * @param  {Function} callback  回调函数
		 * @return {Array}              元素位置信息
		 */
		top: function(selectors, callback) {
			var selectors = getAlignElem(selectors, true),
				minTop = getMinTop(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: minTop});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: prevX,
					nextY: parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
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
			var selectors = getAlignElem(selectors, true),
				maxBottom = getMaxBottom(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem){
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: maxBottom - elem.height()});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: prevX,
					nextY: parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
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
			var selectors = getAlignElem(selectors, true),
				minLeft = getMinLeft(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: minLeft});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: parseInt(elem.css('left'), 10),
					nextY: prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
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
			var selectors = getAlignElem(selectors, true),
				maxRight = getMaxRight(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: maxRight - elem.width()});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: parseInt(elem.css('left'), 10),
					nextY: prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
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
			var selectors = getAlignElem(selectors, true),
				center = getCenter(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: center - Math.floor(elem.width() / 2)});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: parseInt(elem.css('left'), 10),
					nextY: prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
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
			var selectors = getAlignElem(selectors, true),
				middle = getMiddle(selectors),
				data = []; //记录元素位置信息

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: middle - Math.floor(elem.height() / 2)});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: prevX,
					nextY: parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @return {Array}                      元素位置信息
		 */
		canvasTop: function(selectors, canvas, callback) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				canvasOffsetTop = canvas.offset().top,
				distance = getMinTop(selectors) - canvasOffsetTop, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: elem.offset().top - distance});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: prevX,
					nextY: parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 与画布顶对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @return {Array}                      元素位置信息
		 */
		canvasBottom: function(selectors, canvas, callback) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				maxBottom = getMaxBottom(selectors),
				canvasOffsetTop = canvas.offset().top,
				distance = canvasOffsetTop + canvas.height() - maxBottom, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: elem.offset().top + distance});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: prevX,
					nextY: parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 与画布左对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @return {Array}                      元素位置信息
		 */
		canvasLeft: function(selectors, canvas, callback) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				canvasOffsetLeft = canvas.offset().left,
				distance = getMinLeft(selectors) - canvasOffsetLeft, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: elem.offset().left - distance});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: parseInt(elem.css('left'), 10),
					nextY: prevY
				})

			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
				throw new Error('Align: callback must be function!')

			}
			return data
		},
		/**
		 * 与画布右对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @return {Array}                      元素位置信息
		 */
		canvasRight: function(selectors, canvas, callback) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				maxRight = getMaxRight(selectors),
				canvasOffsetLeft = canvas.offset().left,
				distance = canvasOffsetLeft + canvas.width() - maxRight, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: elem.offset().left + distance});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: parseInt(elem.css('left'), 10),
					nextY: prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
				throw new Error('Align: callback must be function!')

			}
			return data
		},
		/**
		 * 与画布水平居中对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @return {Array}                      元素位置信息
		 */
		canvasCenter: function(selectors, canvas, callback) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				center = getCenter(selectors),
				canvasOffsetLeft = canvas.offset().left,
				distance = canvasOffsetLeft + Math.floor(canvas.width() / 2) - center, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({left: elem.offset().left + distance});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: parseInt(elem.css('left'), 10),
					nextY: prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
				throw new Error('Align: callback must be function!')

			}
			return data

		},
		/**
		 * 与画布垂直居中对齐
		 * @param  {String|Object}   selectors  对齐元素
		 * @param  {String|Object}   canvas 	画布元素
		 * @param  {Function} callback  		回调函数
		 * @return {Array}                      元素位置信息
		 */
		canvasVertical: function(selectors, canvas, callback) {
			var selectors = getAlignElem(selectors),
				canvas = getAlignElem(canvas),
				middle = getMiddle(selectors),
				canvasOffsetTop = canvas.offset().top,
				distance = canvasOffsetTop + Math.floor(canvas.height() / 2) - middle, //移动距离
				data = [];

			selectors.each(function(elem) {
				var prevX = parseInt(elem.css('left'), 10),
					prevY = parseInt(elem.css('top'), 10);

				elem.offset({top: elem.offset().top + distance});

				data.push({
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: prevX,
					nextY: parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
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
			var selectors = getAlignElem(selectors, true),
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
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: parseInt(elem.css('left'), 10),
					nextY: prevY
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
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
			var selectors = getAlignElem(selectors, true),
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
					node: elem,
					prevX: prevX,
					prevY: prevY,
					nextX: prevX,
					nextY: parseInt(elem.css('top'), 10)
				})
			});

			if (S.isFunction(callback)) {
				callback(data)

			} else if (callback !== void 0) {
				throw new Error('Align: callback must be function!')

			}
			return data
		}
	}

}, {requires: ['node']});
