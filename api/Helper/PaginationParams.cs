using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helper
{
    public class PaginationParams 
    {
        public int MaxPageSize { get; set; }=50;

        public int PageNumber {set; get;}=1;

        private int _pagesize =6;

        public int PageSize{
            get { return _pagesize; }
            set { _pagesize = value >MaxPageSize ? MaxPageSize : value; }
        }
    }
}