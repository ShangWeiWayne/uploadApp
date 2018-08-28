import { Component, OnInit, Injectable } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource} from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
// tslint:disable-next-line:quotemark
import { MatIconRegistry, MatIcon, MatIconBase, MatIconModule } from "@angular/material/icon";


/**
 * The Json tree data in string. The data could be parsed into Json object
 */
const TREE_DATA = JSON.stringify({
  '五蘊': {
    第一嗢拕南:  {
      '界': '',
      '說': ''
    },
    第二嗢拕南: '',
    第三嗢拕南:  {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    第四嗢拕南:  {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    第五嗢拕南:  {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    第六嗢拕南:  {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    第七嗢拕南:  {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    }
  },
  '六入': {
    angular: {
      src: {
        compiler: 'ts',
        core: 'ts'
      }
    },
    'A': {
      src: {
        button: 'ts',
        checkbox: 'ts',
        input: 'ts'
      }
    }
  },
  '緣起': {
    October: 'pdf',
    November: 'pdf',
    Tutorial: 'html'
  },
  '十八界': {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  },
  '受': {
    'Photo Booth Library': {
      Contents: 'dir',
      Pictures: 'dir'
    },
    Sun: 'png',
    Woods: 'jpg'
  }
});

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: object, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css'],
  providers: [FileDatabase]
})
/**
 * @title Tree with nested nodes
 */
export class TreeviewComponent implements OnInit {
    nestedTreeControl: NestedTreeControl<FileNode>;
    nestedDataSource: MatTreeNestedDataSource<FileNode>;

  constructor(database: FileDatabase) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
   }

  ngOnInit() {
  }
  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;
}



