import React, {useState} from "react";
import '../../App.css';
import "../../sidebarComponents/SideBar.css";
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

class PhotoUploader extends React.Component {

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    render() {
        return (
            <div className="photo-upload">
                <p className="header-text">Add photos</p>
                <FilePond name="photos"
                          allowMultiple={true}
                          ref={(ref) => this.pond = ref}
                          maxFiles={10}
                          oninit={() => this.handleInit() }
                          onupdatefiles={
                              (fileItems) => {
                                  this.props.setPhotos(fileItems.map(fileItem => fileItem.file));
                                  console.log("files updated")
                              }}
                >
                </FilePond>

            </div>
        );
    }
}

export default PhotoUploader;